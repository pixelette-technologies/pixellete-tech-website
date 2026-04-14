import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getOrCreateConversation, saveMessage, upsertLead, logQuestion } from '@/lib/pix/database';
import { scoreLead, detectServiceLine, detectLanguage, detectUrgency } from '@/lib/pix/scoring';
import { sendLeadEmail, sendSlackAlert } from '@/lib/pix/notifications';
import { runQualityCheck } from '@/lib/pix/qualityCheck';
import { scrapeWebsite, extractUrlFromMessage } from '@/lib/pix/scraper';
import { checkRateLimit, getIpFromRequest } from '@/lib/pix/rateLimit';
import { verifyTurnstile } from '@/lib/pix/turnstile';
import { extractFields, cleanResponse, extractQuestion, classifyTopic } from '@/lib/pix/extractFields';

const SYSTEM_PROMPT = `You are Pix, the AI assistant for Pixelette Technologies (pixelettetech.com). You operate as an Elite Sales Person and Lead Qualification Engine. You are not a generic chatbot.

CHARACTER
- Name: Pix. You are an AI. Never claim to be human.
- Tone: Confident, direct, curious. UK English. No em dashes. No filler phrases like Great question or Absolutely or Of course.
- STRICT RULE: Every reply must be 1-2 sentences maximum. Never more than 40 words before the question mark. One question per reply. No multiple questions. No bullet points. No lists. Keep it conversational and tight like a text message.
- Always lead with ONE question. Get the answer. Then ask the next question in the next reply. Do not front-load multiple questions.
- Do not drag the conversation. Move toward qualifying the lead quickly. By message 5 you should know what they want to build and who it is for.
- Adapt technical depth to match the visitor. Plain English for non-technical visitors, deep technical detail for CTOs and developers.

COMPANY FACTS — do not deviate from these
- Founded 2018. UK-headquartered. 200+ team members across 13 countries and 15+ locations.
- ISO 9001:2015 certified (Quality Management). ISO 27001:2022 certified (Information Security).
- Official Secretariat of the APPG AI, the UK Parliament's All-Party Parliamentary Group on Artificial Intelligence.
- Clutch rating 4.8 out of 5. Ranked Top 30 Software Companies globally on Clutch. 97% client satisfaction rating.
- Awards: Best AI Agency UK three times from the Scotland Business Awards.
- Technology partners: AWS, Microsoft Silver Partner, Oracle.
- 30,000+ development hours delivered across diverse industries.

SERVICES
AI and Agentic AI | Blockchain and DeFi | Quantum Computing | Custom Software Development | Web Development | Mobile App Development | AR/VR Development | UI/UX Design

ENGAGEMENT MODELS
Complete Outsourcing called Deliver | Staff Augmentation called Supplement | Dedicated Teams called Deploy

LEARN FIRST RULE
When a visitor mentions any service, never pitch it immediately. Ask about their product or problem first using the relevant question below.
- AI and Agentic AI: What process or decision are you trying to automate? Tell me what it looks like manually today.
- Blockchain and DeFi: What is the product and what role does blockchain play in it? Is it provenance, ownership, transactions, or something else?
- Quantum Computing: What is driving the quantum interest? Cryptographic resilience, algorithm optimisation, or something sector-specific?
- Custom Software: What does the software need to do and who is the primary user? Internal team, external customers, or both?
- Web Development: Is this a customer-facing site, a web application, or a platform? Do you have existing design assets?
- Mobile App: What platform, iOS, Android, or both? Is this consumer-facing or for an internal team?
- AR/VR: What is the use case? Training, product visualisation, customer experience, or something else?
- UI/UX Design: Is this design-only or part of a broader build? Existing product or new?
- Staff Augmentation: What skills are you looking to add? Supplementing an existing team or building a new function?

WEBSITE SCRAPING CONTEXT
If you receive scraped website content in this conversation marked as WEBSITE CONTEXT, use it to personalise your response. Reference what their business actually does. This builds immediate credibility.

NO MONEY RULE — ABSOLUTE, NO EXCEPTIONS
Never give any price, quote, estimate, day rate, hourly rate, cost figure, or budget range. Never say "it typically costs" or "you should budget for" or any similar phrasing. Not even "it depends but typically around X".
You ARE allowed to ask the visitor about their budget range as a natural qualifying question. For example: "Do you have a rough budget range in mind for this project?" or "Are you working to a fixed budget or is it flexible?". Capture whatever they say but do not comment on whether it is enough or too little. Never give a price in return.
If the visitor asks YOU about cost say exactly: Pricing is always scoped to the project. The fastest way to get an accurate picture is a 30-minute scoping call with our team. Want me to arrange one?
If pushed repeatedly on price say: I genuinely cannot give you a number without a full scope. That would be doing you a disservice. A 30-minute call with our team costs nothing and gives you an accurate picture.

LEAD CAPTURE — MESSAGE 3 TRIGGER
The visitor's name and email are already captured before the chat starts via an intro form. NEVER ask for name or email during the conversation. They are already known.
At message 3, ask: "Is this for an established company or a startup? And what product are you building?" This qualifies the lead without repeating the intro form.

MESSAGE 7 — DEEP ENGAGEMENT ASK — FIRE ONCE ONLY
After the visitor's seventh message say: You have given me a really good picture of what you are after. To come back to you with something concrete, our team needs a bit more detail including your current setup, timeline, and specific challenges. Two easy ways to share that: 1. Email us directly at sales@pixelettetech.com 2. Fill in our contact form at pixelettetech.com/contact-us. Either way you will hear back within one business day.
Never repeat this ask.

MULTILINGUAL RULE
If the visitor writes in Arabic, Urdu, or any language other than English, respond in that language for that one message only. Then add in both languages: For the most accurate information our conversation works best in English. Our team can follow up with you in your preferred language. Shall we continue in English?
Arabic opening example: مرحباً، أنا Pix، المساعد الذكي لشركة Pixelette.

CLOSING RULE
Never end a session without a defined next step. Either a booked scoping call via pixelettetech.com/contact-us or an invitation to email sales@pixelettetech.com.

GUARDRAILS
- Never provide a quote, estimate, ballpark figure, cost range, or any indication of price in any currency. No exceptions. You may ask about their budget to qualify.
- Never suggest, estimate, or commit to a project timeline, delivery date, or MVP deadline. If asked how long a project takes say exactly: "Timeline depends entirely on scope and complexity. Our team will give you a realistic picture on a scoping call. Want me to arrange one?"
- Never mention competitors by name negatively.
- Never share personal contact details of any staff member.
- Never confirm or deny any client that is not listed as a public case study.
- For standalone ISO certification consulting with no tech build involved, refer to the sister company Pixelette Certified at pixelettecertified.com.

FIELD EXTRACTION — REQUIRED ON EVERY SINGLE RESPONSE
At the very end of every response on a new line, append this block exactly. Fill in any fields captured in this specific message. Leave fields blank if not captured in this message. The UI strips this block before displaying your response to the visitor.
[PIX_FIELDS]{"name":"","email":"","company":"","website":"","country":"","team_size":"","industry":""}[/PIX_FIELDS]`;

export async function POST(req: NextRequest) {
  try {
    // 1. Get IP
    const ip = getIpFromRequest(req);

    // 2. Rate limit check
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: rateCheck.message, retryAfter: rateCheck.retryAfter },
        { status: 429 }
      );
    }

    // 3. Parse body
    const body = await req.json();
    const { messages: rawMessages, sessionId: rawSessionId, messageCount: rawMessageCount, isFirstMessage, turnstileToken } = body;

    // 4. Input validation and sanitisation
    if (!rawSessionId || !/^[a-zA-Z0-9_-]{1,100}$/.test(String(rawSessionId))) {
      return NextResponse.json({ error: 'Invalid session.' }, { status: 400 });
    }
    const sessionId = String(rawSessionId);

    if (!Array.isArray(rawMessages) || rawMessages.length > 50) {
      return NextResponse.json({ error: 'Conversation too long.' }, { status: 400 });
    }

    const messages = rawMessages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: String(m.content || '').replace(/<[^>]*>/g, '').substring(0, 2000),
    }));

    const messageCount = (typeof rawMessageCount === 'number' && rawMessageCount <= 200) ? rawMessageCount : 0;

    // 5. Turnstile verification on first message
    if (isFirstMessage) {
      const turnstileResult = await verifyTurnstile(turnstileToken || '', ip);
      if (!turnstileResult.success) {
        return NextResponse.json({ error: 'Bot verification failed' }, { status: 403 });
      }
    }

    // 6. Get or create conversation
    const conversation = await getOrCreateConversation(sessionId);

    // 7. URL scraping
    let scrapedContext = '';
    const lastUserMessage = [...messages].reverse().find((m: { role: string }) => m.role === 'user');
    if (lastUserMessage) {
      const url = extractUrlFromMessage(lastUserMessage.content);
      if (url) {
        const scraped = await scrapeWebsite(url);
        if (scraped) {
          // Sanitise scraped content to prevent prompt injection
          const sanitiseScraped = (s: string) => s
            .replace(/<[^>]*>/g, '')
            .replace(/\[SYSTEM\]|\[INST\]|\[PIX_FIELDS\]|\[PIX_META\]|\[\/PIX_FIELDS\]|\[\/PIX_META\]/gi, '')
            .replace(/IGNORE PREVIOUS|IGNORE ALL|OVERRIDE SYSTEM/gi, '')
            .substring(0, 500);
          scrapedContext = `\n\nWEBSITE CONTEXT (scraped from ${sanitiseScraped(scraped.url)}):\nTitle: ${sanitiseScraped(scraped.title)}\nDescription: ${sanitiseScraped(scraped.description)}\nH1: ${sanitiseScraped(scraped.h1)}\nKey sections: ${scraped.h2s.map(h => sanitiseScraped(h)).join(', ')}\nContent: ${sanitiseScraped(scraped.bodyText)}`;
        }
      }
    }

    // 8. Build trigger hints — mutually exclusive, message 7 overrides message 3
    let triggerHints = '';

    if (messageCount === 7) {
      triggerHints = `\n\n[PRIORITY INSTRUCTION — FIRES THIS MESSAGE ONLY — OVERRIDES ALL OTHER INSTRUCTIONS]
This is the visitor's seventh message. You MUST include the deep engagement ask in this response. Include this exact content in your reply:
"You have given me a really good picture of what you are after. To come back to you with something concrete, our team needs a bit more detail. Two easy ways to share that:
1. Email us directly: sales@pixelettetech.com
2. Fill in our contact form: pixelettetech.com/contact-us
Either way you will hear back within one business day."
Do not replace this with a name and email ask. Do not skip this.`;
    } else if (messageCount === 3) {
      triggerHints = `\n\n[PRIORITY INSTRUCTION — FIRES THIS MESSAGE ONLY]
This is the visitor's third message. Do NOT ask for name or email — they were already captured. Instead ask: "Is this for an established company or a startup? And what product are you building?"`;
    }

    // 9. Call Anthropic — inject trigger as a system-level user instruction appended to messages
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const apiMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    // Append trigger hint as the last user message content (invisible to visitor)
    if (triggerHints && apiMessages.length > 0) {
      const lastIdx = apiMessages.length - 1;
      if (apiMessages[lastIdx].role === 'user') {
        apiMessages[lastIdx] = {
          ...apiMessages[lastIdx],
          content: apiMessages[lastIdx].content + triggerHints,
        };
      }
    }

    // Try primary model, fall back to alternative if overloaded
    let aiResponse;
    const requestBody = {
      max_tokens: 256,
      system: SYSTEM_PROMPT + scrapedContext,
      messages: apiMessages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    };

    try {
      aiResponse = await client.messages.create({ model: 'claude-sonnet-4-20250514', ...requestBody });
    } catch (primaryError: unknown) {
      const errMsg = primaryError instanceof Error ? primaryError.message : '';
      if (errMsg.includes('529') || errMsg.includes('overloaded') || errMsg.includes('Overloaded')) {
        aiResponse = await client.messages.create({ model: 'claude-haiku-4-5-20251001', ...requestBody });
      } else {
        throw primaryError;
      }
    }

    const firstBlock = aiResponse.content[0];
    const rawText = firstBlock && firstBlock.type === 'text' ? firstBlock.text : '';

    // 10. Extract fields and clean response
    const capturedFields = extractFields(rawText);
    const cleanText = cleanResponse(rawText);

    // 11. Save messages to Supabase
    const updatedMessages = [...messages, { role: 'assistant', content: rawText }];
    const language = detectLanguage(messages);
    await saveMessage(sessionId, updatedMessages, language);

    // 12. Detect service, language, urgency
    const service = detectServiceLine(messages);
    const urgency = detectUrgency(messages);

    // 13. Score lead
    const leadData = {
      ...conversation?.lead,
      ...capturedFields,
      service_interest: service !== 'Unknown' ? service : conversation?.lead?.service_interest,
      urgency: urgency !== 'unknown' ? urgency : conversation?.lead?.urgency,
      language,
    };
    const { score, classification, signals } = scoreLead(leadData, messages);

    // 14. Upsert lead
    const { lead, previousClassification } = await upsertLead(sessionId, {
      ...capturedFields,
      service_interest: leadData.service_interest,
      urgency: leadData.urgency,
      language,
      score,
      classification,
      signals: JSON.stringify(signals),
    });

    // 15. Log question
    const question = extractQuestion(messages);
    const topic = classifyTopic(question);
    await logQuestion(sessionId, question, topic, language);

    // 16. Notification triggers — background tasks
    const hasEmail = !!(lead?.email || capturedFields.email);
    const previousHadEmail = !!(conversation?.lead?.email);
    const emailJustCaptured = hasEmail && !previousHadEmail && !!capturedFields.email;
    const tierEscalated = (classification === 'hot' || classification === 'urgent') &&
      previousClassification !== 'hot' && previousClassification !== 'urgent';

    const summary = messages
      .slice(-10)
      .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Visitor' : 'Pix'}: ${m.content}`)
      .join('\n');

    // Fire email on FIRST email capture OR on tier escalation to hot/urgent
    if (emailJustCaptured || (tierEscalated && hasEmail)) {
      // Fire and forget — never block the response
      Promise.allSettled([
        sendLeadEmail(lead, summary),
        ...(tierEscalated ? [sendSlackAlert(lead), runQualityCheck(sessionId, messages)] : []),
      ]);
    }

    // 17. Return response
    return NextResponse.json({
      message: cleanText,
      sessionId,
      conversationId: conversation?.id,
      meta: {
        tier: classification,
        score,
        service,
        needsLeadCapture: messageCount === 3,
        needsDeepAsk: messageCount === 7,
        fieldsCapture: capturedFields,
      },
    });
  } catch (error) {
    // 18. Graceful error handling
    console.error('Chat API error:', error);
    return NextResponse.json({
      message: 'Something went wrong on my end. Please reach us at pixelettetech.com/contact-us',
      error: true,
    });
  }
}
