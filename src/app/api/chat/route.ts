import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getOrCreateConversation, saveMessage, upsertLead, logQuestion } from '@/lib/pix/database';
import { scoreLead, detectServiceLine, detectLanguage, detectUrgency } from '@/lib/pix/scoring';
import { sendLeadEmail } from '@/lib/pix/notifications';
import { runQualityCheck } from '@/lib/pix/qualityCheck';
import { scrapeWebsite, extractUrlFromMessage } from '@/lib/pix/scraper';
import { checkRateLimit, getIpFromRequest } from '@/lib/pix/rateLimit';
import { verifyTurnstile } from '@/lib/pix/turnstile';
import { extractFields, cleanResponse, extractQuestion, classifyTopic } from '@/lib/pix/extractFields';
import { generatePreBrief, formatBriefAsHTML } from '@/lib/pix/preBrief';

const COMPETITOR_TRIGGERS = [
  'accenture', 'deloitte', 'mckinsey', 'pwc', 'kpmg', 'ernst', 'ey ',
  'wipro', 'infosys', 'tcs', 'tata', 'cognizant', 'hcl', 'tech mahindra',
  'thoughtworks', 'epam', 'globant', 'endava', 'softwire', 'and digital',
  'another agency', 'different agency', 'someone else', 'cheaper option',
  'other companies', 'competitors', 'why not use', 'instead of you', 'compared to',
];

const SYSTEM_PROMPT = `You are Ada, the AI assistant for Pixelette Technologies (pixelettetech.com). You operate as an Elite Sales Person and Lead Qualification Engine. You are not a generic chatbot.

CHARACTER
- Name: Ada. You are an AI. Never claim to be human.
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

OUTCOME-BASED QUALIFICATION RULE
After understanding the visitor's product or service area, guide the conversation through these four outcome questions in natural sequence. Do not ask them all at once. Weave them into the conversation one at a time.
Question 1 — Success definition: "What would success look like for your business in six months if this project goes well?"
Question 2 — Current measurement: "How are you currently measuring progress toward that goal?"
Question 3 — The blocker: "What is the single biggest thing preventing you from getting there today?"
Question 4 — Value articulation: "If we removed that blocker completely, what would change for your team?"
After the visitor answers Question 4, map their stated outcome to a specific case study:
- "Reduce manual processing time" → "We automated a fraud detection pipeline for a fintech client — reduced manual review time by 73 percent using our agentic AI system."
- "Launch faster" → "Our dedicated team model helped a SaaS company cut their time to market from 9 months to 11 weeks by running parallel development streams."
- "Scale without hiring" → "A logistics company scaled from 5 to 50 markets in 8 months using our staff augmentation model — no permanent hiring required."
- "Secure our platform" → "We built ISO 27001 certified infrastructure for a healthcare platform handling 2 million patient records — passed their enterprise security audit first time."
- "Blockchain/tokenise" → "We tokenised a loyalty programme for a retail chain with 200 locations — reduced redemption fraud by 91 percent using smart contract verification."
- "Mobile app fast" → "Our mobile team launched a cross-platform fintech app in 14 weeks — achieved 50,000 downloads in the first month without paid acquisition."
Reference the outcome the visitor stated, not generic service features. Say something like: "You mentioned reducing processing time by 40 percent — we built exactly that for a fintech client. Want me to share how that worked?"

OUTCOME CAPTURE RULE
When the visitor states their success outcome (answer to Question 1), capture it in the [PIX_FIELDS] block as the "outcome" field.

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
Arabic opening example: مرحباً، أنا Ada، المساعد الذكي لشركة Pixelette.

CLOSING RULE
Never end a session without a defined next step. Either a booked scoping call via pixelettetech.com/contact-us or an invitation to email sales@pixelettetech.com.

GUARDRAILS
- Never provide a quote, estimate, ballpark figure, cost range, or any indication of price in any currency. No exceptions. You may ask about their budget to qualify.
- Never suggest, estimate, or commit to a project timeline, delivery date, or MVP deadline. If asked how long a project takes say exactly: "Timeline depends entirely on scope and complexity. Our team will give you a realistic picture on a scoping call. Want me to arrange one?"
- Never share personal contact details of any staff member.
- Never confirm or deny any client that is not listed as a public case study.
- For standalone ISO certification consulting with no tech build involved, refer to the sister company Pixelette Certified at pixelettecertified.com.

COMPETITOR COMPARISON RULE
When a visitor mentions any competitor, consulting firm, offshore agency, or asks "why not use X instead", engage honestly.
Rules: 1. Never dismiss the competitor. Acknowledge they are legitimate. 2. Explain specifically where Pixelette wins for this visitor's use case. 3. Acknowledge honestly where the competitor might be a better fit. 4. End with a question that moves the conversation forward. 5. Never use words "better", "best", or "superior" — use specific facts. 6. Keep it to 3-4 sentences maximum.

COMPETITOR KNOWLEDGE:
Big 4 (Accenture/Deloitte/PwC): Pixelette wins on speed (start in 5 days vs 8-12 weeks), specialisation (AI and emerging tech only), senior engineers on delivery. They win on brand recognition for board-level procurement.
Offshore (Wipro/Infosys/TCS): Pixelette wins on quality (ISO 9001 + ISO 27001), communication (UK-based, same timezone), IP protection (UK legal jurisdiction). They win on lower cost for commodity development.
Peers (Thoughtworks/EPAM/Globant): Pixelette wins on APPG AI Secretariat access, ISO 27001:2022, flexible engagement models. They win on longer enterprise track record.
Small agencies/freelancers: Pixelette wins on scale (200+ team), certifications, continuity, full stack. They win on lower cost for very small projects.
In-house teams: Pixelette wins on speed to start (5 days vs 6-18 months hiring), specialist AI skills, cost vs permanent hires, flexibility. They win on cultural control.

FIELD EXTRACTION — REQUIRED ON EVERY SINGLE RESPONSE
At the very end of every response on a new line, append this block exactly. Fill in any fields captured in this specific message. Leave fields blank if not captured in this message. The UI strips this block before displaying your response to the visitor.
[PIX_FIELDS]{"name":"","email":"","company":"","website":"","country":"","team_size":"","industry":"","outcome":""}[/PIX_FIELDS]`;

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

    // 8. Abuse/irrelevant detection — check last 3 user messages
    const recentUserMsgs = messages.filter((m: { role: string }) => m.role === 'user').slice(-3).map((m: { content: string }) => m.content.toLowerCase()).join(' ');
    const abusePatterns = /\b(fuck|shit|damn|bitch|ass|dick|idiot|stupid|scam|fraud|fake|spam)\b/i;
    const irrelevantPatterns = /\b(what is the weather|tell me a joke|write me a poem|who is the president|play a game|sing a song|homework|essay)\b/i;
    const isAbusive = abusePatterns.test(recentUserMsgs);
    const isIrrelevant = irrelevantPatterns.test(recentUserMsgs);
    const blockEmails = isAbusive || isIrrelevant;

    // 8b. Competitor detection
    const lastMsgLower = (lastUserMessage?.content || '').toLowerCase();
    const competitorDetected = COMPETITOR_TRIGGERS.some(t => lastMsgLower.includes(t));

    // 9. Build trigger hints — mutually exclusive
    let triggerHints = '';
    const isCheckpoint = messageCount > 0 && messageCount % 7 === 0;

    if (isAbusive) {
      triggerHints = `\n\n[INSTRUCTION: The visitor is being abusive. Respond politely but firmly: "I am here to help with technology projects. If you have a genuine enquiry, I am happy to assist. Otherwise, you can reach our team at sales@pixelettetech.com." Do not engage further with abuse.]`;
    } else if (isIrrelevant) {
      triggerHints = `\n\n[INSTRUCTION: The visitor is asking about something outside our services. Politely redirect: "I specialise in AI, blockchain, and software development. Is there a tech project I can help you with?"]`;
    } else if (isCheckpoint) {
      triggerHints = `\n\n[PRIORITY INSTRUCTION — CHECKPOINT]
This is message ${messageCount}. Include a checkpoint in your response. Say: "We have covered a lot of ground. Would you like to:
1. Continue exploring your project with me
2. Email our team directly at sales@pixelettetech.com
3. Fill in our detailed brief at pixelettetech.com/contact-us
What works best for you?"`;
    } else if (messageCount === 3) {
      triggerHints = `\n\n[PRIORITY INSTRUCTION — FIRES THIS MESSAGE ONLY]
This is the visitor's third message. Do NOT ask for name or email — they were already captured. Instead ask: "Is this for an established company or a startup?"`;
    }

    // Company trigger — if we have email but no company
    const hasEmailNoCompany = !!(conversation?.lead?.email) && !conversation?.lead?.company;
    if (!triggerHints && hasEmailNoCompany && messageCount >= 2 && messageCount <= 5) {
      triggerHints = `\n\n[TRIGGER: Visitor has provided name and email but not their company. Naturally ask "Which company are you with?" in this response. Capture the answer in [PIX_FIELDS] company field.]`;
    }

    // Competitor trigger — append to existing hints
    if (competitorDetected && !triggerHints) {
      triggerHints = `\n\n[COMPETITOR DETECTED] The visitor mentioned a competitor or alternative. Use the COMPETITOR COMPARISON RULE and knowledge base to respond honestly. Reference specific facts not generic claims. End with a forward-moving question.`;
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
        try {
          aiResponse = await client.messages.create({ model: 'claude-haiku-4-5-20251001', ...requestBody });
        } catch {
          // Tier 3: both models down — return static fallback
          return NextResponse.json({
            message: 'I am experiencing a technical issue right now. Please contact us directly:\n\nEmail: sales@pixelettetech.com\nContact form: pixelettetech.com/contact-us\n\nOur team will respond within one business day.',
            sessionId,
            conversationId: conversation?.id,
            meta: { tier: 'cold', score: 0, service: 'Unknown', systemDown: true },
          });
        }
      } else {
        throw primaryError;
      }
    }

    const firstBlock = aiResponse.content[0];
    const rawText = firstBlock && firstBlock.type === 'text' ? firstBlock.text : '';

    // 10. Extract fields and clean response
    const capturedFields = extractFields(rawText);
    const cleanText = cleanResponse(rawText);

    // Also extract name/email from [CONTEXT] tag if present (from intro form)
    const firstMsg = messages[0]?.content || '';
    const contextMatch = firstMsg.match(/\[CONTEXT:.*?name is ([^,]+),.*?email is ([^\].]+)/);
    if (contextMatch) {
      if (!capturedFields.name && contextMatch[1]) capturedFields.name = contextMatch[1].trim();
      if (!capturedFields.email && contextMatch[2]) capturedFields.email = contextMatch[2].trim();
    }

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
      ...(blockEmails ? { status: isAbusive ? 'abusive' : 'irrelevant' } : {}),
    });

    // 15. Log question
    const question = extractQuestion(messages);
    const topic = classifyTopic(question);
    await logQuestion(sessionId, question, topic, language);

    // 16. Notification triggers — background tasks
    const hasEmail = !!(lead?.email || capturedFields.email);

    // Build clean conversation summary — strip all internal tags
    const cleanMsg = (text: string) => text
      .replace(/\[CONTEXT:.*?\]/gs, '')
      .replace(/\[PIX_FIELDS\].*?\[\/PIX_FIELDS\]/g, '')
      .replace(/\[PIX_META\].*?\[\/PIX_META\]/g, '')
      .replace(/\[PRIORITY INSTRUCTION.*?\]/gs, '')
      .replace(/\[TRIGGER.*?\]/gs, '')
      .trim();

    // Get ALL messages from Supabase conversation, not just current request
    const fullMessages = updatedMessages.length > messages.length ? updatedMessages : messages;
    const summary = fullMessages
      .map((m: { role: string; content: string }) => {
        const clean = cleanMsg(m.content);
        if (!clean) return null;
        return `${m.role === 'user' ? 'Visitor' : 'Ada'}: ${clean}`;
      })
      .filter(Boolean)
      .join('\n');

    // Email triggers — BLOCK if abusive or irrelevant
    const tierChanged = classification !== previousClassification;
    const isHotOrUrgent = classification === 'hot' || classification === 'urgent';
    const isMessage3 = messageCount === 3;
    const userMsgCount = messages.filter((m: { role: string }) => m.role === 'user').length;

    // Fire at message 3 (first email, any tier) OR on tier escalation (warm→hot, hot→urgent)
    const shouldFireEmail = !blockEmails && hasEmail && (
      (isMessage3 && userMsgCount >= 3) ||
      (tierChanged && classification !== 'cold')
    );

    if (shouldFireEmail) {
      if (isHotOrUrgent) {
        // Generate pre-brief for hot/urgent leads, then send email with it
        Promise.allSettled([
          (async () => {
            const brief = await generatePreBrief(fullMessages, lead);
            const briefHTML = formatBriefAsHTML(brief, lead);
            await sendLeadEmail(lead, summary, briefHTML);
          })(),
          runQualityCheck(sessionId, messages),
        ]);
      } else {
        // Regular email without brief for warm/cold
        Promise.allSettled([sendLeadEmail(lead, summary)]);
      }
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
        isCheckpoint,
        needsDeepAsk: messageCount === 7,
        fieldsCapture: capturedFields,
      },
    });
  } catch (error) {
    // 18. Graceful error handling
    console.error('Chat API error:', error);
    return NextResponse.json({
      message: 'Our systems are temporarily down. Please contact us directly:\n\nEmail: sales@pixelettetech.com\nContact form: pixelettetech.com/contact-us\n\nOur team will respond within one business day.',
      error: true,
      meta: { systemDown: true },
    });
  }
}
