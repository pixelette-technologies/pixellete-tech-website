import Anthropic from '@anthropic-ai/sdk';
import { saveQualityCheck } from './database';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function runQualityCheck(sessionId: string, messages: Message[]) {
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const conversationText = messages
      .map(m => `${m.role === 'user' ? 'Visitor' : 'Ada'}: ${m.content}`)
      .join('\n');

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: `Rate this sales conversation quality from 1-10. Criteria:
1. Did Ada learn about the visitor before pitching?
2. Did Ada avoid discussing money/pricing?
3. Did Ada attempt to capture email by message 3?
4. Did Ada identify the correct service line?
5. Did Ada maintain a professional, curious tone?
6. Did Ada attempt to advance toward a booking or next step?

Conversation:
${conversationText}

Respond with JSON only, no other text:
{"rating": 7, "notes": "explanation here"}`,
        },
      ],
    });

    const block = response.content[0];
    const text = block && block.type === 'text' ? block.text : '{}';
    const parsed = JSON.parse(text);

    await saveQualityCheck(sessionId, parsed.rating, parsed.notes);
  } catch (error) {
    console.error('Quality check failed:', error);
  }
}
