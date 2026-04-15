interface CapturedFields {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  country?: string;
  team_size?: string;
  industry?: string;
  outcome?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function extractFields(responseText: string): CapturedFields {
  const match = responseText.match(/\[PIX_FIELDS\](.*?)\[\/PIX_FIELDS\]/);
  if (!match) return {};

  try {
    const parsed = JSON.parse(match[1] || '{}');
    const fields: CapturedFields = {};
    if (parsed.name && parsed.name.trim()) fields.name = parsed.name.trim();
    if (parsed.email && parsed.email.trim()) fields.email = parsed.email.trim();
    if (parsed.company && parsed.company.trim()) fields.company = parsed.company.trim();
    if (parsed.website && parsed.website.trim()) fields.website = parsed.website.trim();
    if (parsed.country && parsed.country.trim()) fields.country = parsed.country.trim();
    if (parsed.team_size && parsed.team_size.trim()) fields.team_size = parsed.team_size.trim();
    if (parsed.industry && parsed.industry.trim()) fields.industry = parsed.industry.trim();
    if (parsed.outcome && parsed.outcome.trim()) fields.outcome = parsed.outcome.trim();
    return fields;
  } catch {
    return {};
  }
}

export function cleanResponse(responseText: string): string {
  return responseText
    .replace(/\[PIX_FIELDS\].*?\[\/PIX_FIELDS\]/g, '')
    .replace(/\[PIX_META\].*?\[\/PIX_META\]/g, '')
    .trim();
}

export function extractQuestion(messages: Message[]): string {
  const lastUser = [...messages].reverse().find(m => m.role === 'user');
  return lastUser?.content || '';
}

export function classifyTopic(question: string): string {
  const q = question.toLowerCase();
  const topicMap: Record<string, string[]> = {
    pricing: ['price', 'cost', 'budget', 'how much', 'rate', 'pricing', 'quote', 'estimate', 'afford'],
    ai: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'chatbot', 'agentic', 'llm', 'nlp'],
    blockchain: ['blockchain', 'web3', 'defi', 'smart contract', 'nft', 'token', 'crypto'],
    mobile: ['mobile', 'ios', 'android', 'app', 'react native', 'flutter'],
    web: ['website', 'web app', 'frontend', 'backend', 'next.js', 'react', 'web development'],
    quantum: ['quantum', 'qubit'],
    ar_vr: ['ar', 'vr', 'augmented', 'virtual reality', 'metaverse'],
    compliance: ['iso', 'certification', 'compliance', 'security', 'gdpr'],
    staffing: ['staff', 'augmentation', 'outsourc', 'dedicated team', 'hire', 'developers'],
    process: ['how do you work', 'process', 'methodology', 'agile', 'timeline', 'how long'],
    company_info: ['about', 'founded', 'team size', 'where are you', 'office', 'location'],
  };

  for (const [topic, keywords] of Object.entries(topicMap)) {
    if (keywords.some(kw => q.includes(kw))) return topic;
  }
  return 'general';
}
