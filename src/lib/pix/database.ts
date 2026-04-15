import { supabaseAdmin } from './supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Lead {
  id?: string;
  session_id: string;
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  industry?: string;
  country?: string;
  team_size?: string;
  service_interest?: string;
  urgency?: string;
  language?: string;
  score?: number;
  classification?: string;
  status?: string;
  notes?: string;
  signals?: string;
  outcome?: string;
  success_metric?: string;
  main_blocker?: string;
  block_emails?: boolean;
  status_reason?: string;
}

export async function getOrCreateConversation(sessionId: string) {
  const { data: existing } = await supabaseAdmin
    .from('conversations')
    .select('*, lead:leads(*)')
    .eq('session_id', sessionId)
    .single();

  if (existing) return existing;

  const { data: lead } = await supabaseAdmin
    .from('leads')
    .insert({ session_id: sessionId })
    .select()
    .single();

  const { data: conversation } = await supabaseAdmin
    .from('conversations')
    .insert({ session_id: sessionId, lead_id: lead!.id })
    .select('*, lead:leads(*)')
    .single();

  return conversation;
}

export async function getConversationHistory(sessionId: string) {
  const { data } = await supabaseAdmin
    .from('conversations')
    .select('messages, message_count, language')
    .eq('session_id', sessionId)
    .single();

  if (!data) return { messages: [], messageCount: 0, language: 'English' };
  return {
    messages: data.messages || [],
    messageCount: data.message_count || 0,
    language: data.language || 'English',
  };
}

export async function saveMessage(sessionId: string, messages: Message[], language: string) {
  const userMessageCount = messages.filter((m: Message) => m.role === 'user').length;
  const { error } = await supabaseAdmin
    .from('conversations')
    .update({
      messages,
      message_count: userMessageCount,
      language,
      last_message_at: new Date().toISOString(),
    })
    .eq('session_id', sessionId);

  if (error) console.error('saveMessage error:', error);
}

export async function upsertLead(sessionId: string, fields: Partial<Lead>) {
  const { data: existing } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('session_id', sessionId)
    .single();

  const previousClassification = existing?.classification || 'cold';

  const updateFields: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null && value !== '') {
      updateFields[key] = value;
    }
  }

  if (existing) {
    const { data: lead } = await supabaseAdmin
      .from('leads')
      .update(updateFields)
      .eq('session_id', sessionId)
      .select()
      .single();
    return { lead, previousClassification };
  }

  const { data: lead } = await supabaseAdmin
    .from('leads')
    .insert({ session_id: sessionId, ...updateFields })
    .select()
    .single();
  return { lead, previousClassification };
}

export async function saveQualityCheck(sessionId: string, aiRating: number, aiNotes: string, preBrief?: unknown) {
  const { data: conv } = await supabaseAdmin
    .from('conversations')
    .select('id')
    .eq('session_id', sessionId)
    .single();

  if (!conv) return;

  await supabaseAdmin
    .from('quality_checks')
    .insert({
      conversation_id: conv.id,
      ai_rating: aiRating,
      ai_notes: aiNotes,
      ...(preBrief ? { pre_brief: preBrief } : {}),
    });
}

export async function saveVisitorRating(sessionId: string, rating: number, comment?: string) {
  const { data: conv } = await supabaseAdmin
    .from('conversations')
    .select('id')
    .eq('session_id', sessionId)
    .single();

  if (!conv) return;

  const { data: existing } = await supabaseAdmin
    .from('quality_checks')
    .select('id')
    .eq('conversation_id', conv.id)
    .single();

  if (existing) {
    await supabaseAdmin
      .from('quality_checks')
      .update({ visitor_rating: rating, visitor_comment: comment || null })
      .eq('id', existing.id);
  } else {
    await supabaseAdmin
      .from('quality_checks')
      .insert({
        conversation_id: conv.id,
        visitor_rating: rating,
        visitor_comment: comment || null,
      });
  }
}

export async function logQuestion(sessionId: string, question: string, topic: string, language: string) {
  const { data: conv } = await supabaseAdmin
    .from('conversations')
    .select('id')
    .eq('session_id', sessionId)
    .single();

  if (!conv) return;

  await supabaseAdmin
    .from('questions_log')
    .insert({
      conversation_id: conv.id,
      question,
      topic,
      language,
    });
}

export async function getWeeklyStats() {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [leads, conversations, quality, questions] = await Promise.all([
    supabaseAdmin.from('leads').select('*').gte('created_at', weekAgo),
    supabaseAdmin.from('conversations').select('*').gte('started_at', weekAgo),
    supabaseAdmin.from('quality_checks').select('*').gte('created_at', weekAgo),
    supabaseAdmin.from('questions_log').select('*').gte('created_at', weekAgo),
  ]);

  return {
    leads: leads.data || [],
    conversations: conversations.data || [],
    quality: quality.data || [],
    questions: questions.data || [],
  };
}
