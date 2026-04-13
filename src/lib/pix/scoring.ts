interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Lead {
  email?: string;
  name?: string;
  company?: string;
  website?: string;
  service_interest?: string;
  urgency?: string;
  [key: string]: unknown;
}

const PERSONAL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'live.com', 'protonmail.com'];

export function scoreLead(lead: Lead, messages: Message[]): { score: number; classification: string; signals: string[] } {
  let score = 0;
  const signals: string[] = [];
  const allUserText = messages.filter(m => m.role === 'user').map(m => m.content.toLowerCase()).join(' ');
  const userMessageCount = messages.filter(m => m.role === 'user').length;

  // 1. Business email (+10) vs Personal email (+5)
  if (lead.email) {
    const domain = lead.email.split('@')[1]?.toLowerCase();
    if (domain && !PERSONAL_DOMAINS.includes(domain)) {
      score += 10;
      signals.push('business_email');
    } else {
      score += 5;
      signals.push('personal_email');
    }
  }

  // 2. Phone provided (+5)
  if (/(\+?\d[\d\s\-]{7,}|\(\d{3}\))/.test(allUserText)) {
    score += 5;
    signals.push('phone_provided');
  }

  // 3. Company provided (+5)
  if (lead.company) {
    score += 5;
    signals.push('company_provided');
  }

  // 4. Urgent language (+15)
  if (/\b(asap|this week|deadline|today|immediately|right away|as soon as possible)\b/i.test(allUserText)) {
    score += 15;
    signals.push('urgent_language');
  }

  // 5. Defined timeline (+8)
  if (/\b(next month|next quarter|q[1-4]|in \d+ weeks?|in \d+ months?|by (january|february|march|april|may|june|july|august|september|october|november|december))\b/i.test(allUserText)) {
    score += 8;
    signals.push('defined_timeline');
  }

  // 6. Active tender/RFP (+10)
  if (/\b(tender|rfp|rfq|procurement|bid|proposal request)\b/i.test(allUserText)) {
    score += 10;
    signals.push('active_tender');
  }

  // 7. Decision maker (+15)
  if (/\b(i am (the )?(ceo|cto|cfo|coo|founder|co-founder|director|head of|vp |vice president|managing director|owner))\b/i.test(allUserText)) {
    score += 15;
    signals.push('decision_maker');
  }

  // 8. Company representative (+8)
  if (/\b(we are|our company|our team|our organisation|our organization|our business|our firm)\b/i.test(allUserText)) {
    score += 8;
    signals.push('company_representative');
  }

  // 9-11. Engagement depth
  if (userMessageCount >= 8) {
    score += 15;
    signals.push('deep_engagement');
  } else if (userMessageCount >= 5) {
    score += 10;
    signals.push('medium_engagement');
  } else if (userMessageCount >= 3) {
    score += 5;
    signals.push('light_engagement');
  }

  // 12. Service identified (+5)
  if (lead.service_interest && lead.service_interest !== 'Unknown') {
    score += 5;
    signals.push('service_identified');
  }

  // 13. Specific use case (+5)
  if (/\b(build|develop|create|implement|deploy|launch|migrate)\b.*\b(platform|app|application|system|dashboard|portal|website|api|tool)\b/i.test(allUserText)) {
    score += 5;
    signals.push('specific_use_case');
  }

  // 14. Enterprise scale (+8)
  if (/\b(50\+|100\+|500\+|1000\+|enterprise|global|international|multinational|fortune)\b/i.test(allUserText)) {
    score += 8;
    signals.push('enterprise_scale');
  }

  // 15. Website shared (+2)
  if (lead.website || /https?:\/\/|www\./i.test(allUserText)) {
    score += 2;
    signals.push('website_shared');
  }

  // 16. Buying questions (+6)
  if (/\b(how much|what.s the (cost|price|process)|how long|what.s the timeline|when can you start|availability)\b/i.test(allUserText)) {
    score += 6;
    signals.push('buying_questions');
  }

  // 17. Meeting requested (+4)
  if (/\b(book|schedule|arrange|set up|call|demo|meeting|consultation)\b/i.test(allUserText)) {
    score += 4;
    signals.push('meeting_requested');
  }

  // Cap at 100
  score = Math.min(score, 100);

  // Classification
  let classification = 'cold';
  if (score >= 76) classification = 'urgent';
  else if (score >= 51) classification = 'hot';
  else if (score >= 26) classification = 'warm';

  return { score, classification, signals };
}

export function detectServiceLine(messages: Message[]): string {
  const text = messages.filter(m => m.role === 'user').map(m => m.content.toLowerCase()).join(' ');

  const serviceMap: Record<string, string[]> = {
    'AI Development': ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'nlp', 'chatbot', 'agentic', 'llm', 'gpt', 'neural'],
    'Blockchain Development': ['blockchain', 'defi', 'smart contract', 'web3', 'nft', 'token', 'crypto', 'decentralised', 'decentralized', 'ethereum', 'solidity'],
    'Quantum Computing': ['quantum', 'qubit', 'quantum computing'],
    'Custom Software': ['software', 'saas', 'erp', 'crm', 'custom platform', 'bespoke', 'enterprise software'],
    'Web Development': ['website', 'web app', 'web application', 'frontend', 'backend', 'full stack', 'next.js', 'react'],
    'Mobile App Development': ['mobile app', 'ios', 'android', 'react native', 'flutter', 'mobile application'],
    'AR/VR Development': ['ar', 'vr', 'augmented reality', 'virtual reality', 'mixed reality', 'metaverse', 'xr'],
    'UI/UX Design': ['ui', 'ux', 'design', 'user interface', 'user experience', 'figma', 'prototype'],
    'Staff Augmentation': ['staff augmentation', 'outsourcing', 'dedicated team', 'hire developers', 'extend team'],
  };

  for (const [service, keywords] of Object.entries(serviceMap)) {
    if (keywords.some(kw => text.includes(kw))) return service;
  }
  return 'Unknown';
}

export function detectLanguage(messages: Message[]): string {
  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';
  if (/[\u0600-\u06FF]/.test(lastUserMsg)) return 'Arabic';
  if (/[\u0600-\u06FF\u0750-\u077F]/.test(lastUserMsg) && /[\u0679\u0688\u0691\u06BA\u06BE\u06C1\u06D2]/.test(lastUserMsg)) return 'Urdu';
  if (/[àâçéèêëîïôûùüÿæœ]/i.test(lastUserMsg) && /\b(je|nous|vous|est|les|des|une|que|pour|avec)\b/i.test(lastUserMsg)) return 'French';
  return 'English';
}

export function detectUrgency(messages: Message[]): string {
  const text = messages.filter(m => m.role === 'user').map(m => m.content.toLowerCase()).join(' ');
  if (/\b(asap|today|this week|immediately|urgent|right away|deadline)\b/.test(text)) return 'urgent';
  if (/\b(next month|next quarter|soon|in \d+ weeks?)\b/.test(text)) return 'soon';
  if (/\b(exploring|future|long term|next year|eventually)\b/.test(text)) return 'future';
  return 'unknown';
}
