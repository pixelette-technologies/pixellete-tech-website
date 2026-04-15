import Anthropic from '@anthropic-ai/sdk';

interface Message {
  role: string;
  content: string;
}

interface Lead {
  name?: string;
  company?: string;
  service_interest?: string;
  score?: number;
  outcome?: string;
  [key: string]: unknown;
}

interface PreBrief {
  prospect_summary: string;
  their_product: string;
  stated_outcome: string;
  main_blocker: string;
  service_fit: string;
  engagement_model: string;
  competitor_context: string | null;
  decision_maker: string;
  urgency_level: string;
  recommended_opening: string;
  questions_to_ask: string[];
  watch_out_for: string | null;
}

const BRIEF_PROMPT = `You are a sales intelligence analyst for Pixelette Technologies. A prospect has just been classified as a high-priority lead. Based on the conversation below, generate a structured pre-call brief for the sales team member who will speak with this prospect.

The brief must be concise, factual, and actionable. Use only information from the conversation — do not invent details.

Return ONLY a JSON object in this exact format, no other text:
{"prospect_summary":"2-3 sentence summary","their_product":"what they are building","stated_outcome":"the specific outcome they want in their own words","main_blocker":"the single biggest thing preventing them","service_fit":"which Pixelette service fits and why","engagement_model":"Complete Outsourcing, Staff Augmentation, or Dedicated Teams — and why","competitor_context":"any competitors mentioned or null","decision_maker":"Yes / No / Unknown","urgency_level":"Immediate / This quarter / Exploring","recommended_opening":"one sentence the sales person should open with","questions_to_ask":["3 to 5 specific questions"],"watch_out_for":"concerns or objections detected, or null"}`;

export async function generatePreBrief(messages: Message[], lead: Lead): Promise<PreBrief | null> {
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const conversationText = messages
      .map(m => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n\n');

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `${BRIEF_PROMPT}\n\n--- CONVERSATION ---\n${conversationText}\n\n--- LEAD DATA ---\nName: ${lead.name || 'Unknown'}\nCompany: ${lead.company || 'Unknown'}\nService Interest: ${lead.service_interest || 'Unknown'}\nScore: ${lead.score || 0}/100\nOutcome: ${lead.outcome || 'Not stated'}${lead.industry || lead.team_size ? `\n\n--- COMPANY INTELLIGENCE ---\nIndustry: ${lead.industry || 'Unknown'}\nSize: ${lead.team_size || 'Unknown'}\nCountry: ${lead.country || 'Unknown'}\nWebsite: ${lead.website || 'Unknown'}` : ''}`,
      }],
    });

    const block = response.content[0];
    const text = block && block.type === 'text' ? block.text.trim() : '{}';
    return JSON.parse(text) as PreBrief;
  } catch (err) {
    console.error('Pre-brief generation failed:', err);
    return null;
  }
}

function esc(s: string): string {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function formatBriefAsHTML(brief: PreBrief | null, lead: Lead): string {
  if (!brief) return '';

  const row = (label: string, value: string, alt?: boolean) => `
    <tr${alt ? ' style="background:#0a0c12;"' : ''}>
      <td style="padding:10px 12px;vertical-align:top;width:35%;font-size:11px;color:#6b7280;text-transform:uppercase;font-weight:600;letter-spacing:1px;">${label}</td>
      <td style="padding:10px 12px;font-size:14px;color:#e2e8f0;">${esc(value)}</td>
    </tr>`;

  return `
    <div style="background:#111318;border:1px solid #1b1f2b;border-radius:10px;padding:0;margin-top:20px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#1e1145,#2d1b69);padding:16px 20px;border-bottom:1px solid #2d1b4e;">
        <h2 style="color:#fff;font-size:14px;margin:0;letter-spacing:1px;text-transform:uppercase;">Pre-Call Brief — ${esc(lead.name || 'Prospect')}</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${row('Prospect Summary', brief.prospect_summary || 'N/A')}
        ${row('Their Product', brief.their_product || 'N/A', true)}
        ${row('Stated Outcome', `"${brief.stated_outcome || 'Not captured'}"'`)}
        ${row('Main Blocker', brief.main_blocker || 'N/A', true)}
        ${row('Service Fit', brief.service_fit || 'N/A')}
        ${row('Engagement Model', brief.engagement_model || 'N/A', true)}
        ${row('Decision Maker', brief.decision_maker || 'Unknown')}
        ${row('Urgency', brief.urgency_level || 'Unknown', true)}
        ${brief.competitor_context ? row('Competitor Context', brief.competitor_context) : ''}
      </table>
      <div style="margin:16px;padding:14px;background:rgba(109,40,217,0.08);border-left:4px solid #7c3aed;border-radius:0 8px 8px 0;">
        <div style="font-size:11px;color:#a78bfa;font-weight:600;text-transform:uppercase;margin-bottom:6px;">Recommended Opening Line</div>
        <div style="font-size:14px;color:#e2e8f0;font-style:italic;">"${esc(brief.recommended_opening || 'Ask about their timeline.')}"</div>
      </div>
      <div style="margin:0 16px 16px;padding:14px;background:rgba(245,158,11,0.08);border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;">
        <div style="font-size:11px;color:#f59e0b;font-weight:600;text-transform:uppercase;margin-bottom:8px;">Questions to Ask</div>
        <ol style="margin:0;padding-left:18px;">
          ${(brief.questions_to_ask || []).map((q: string) => `<li style="font-size:14px;color:#e2e8f0;margin-bottom:6px;">${esc(q)}</li>`).join('')}
        </ol>
      </div>
      ${brief.watch_out_for ? `
      <div style="margin:0 16px 16px;padding:14px;background:rgba(239,68,68,0.08);border-left:4px solid #ef4444;border-radius:0 8px 8px 0;">
        <div style="font-size:11px;color:#ef4444;font-weight:600;text-transform:uppercase;margin-bottom:6px;">Watch Out For</div>
        <div style="font-size:14px;color:#e2e8f0;">${esc(brief.watch_out_for)}</div>
      </div>` : ''}
    </div>`;
}
