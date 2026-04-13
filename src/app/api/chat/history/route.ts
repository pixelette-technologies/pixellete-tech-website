import { NextRequest, NextResponse } from 'next/server';
import { getConversationHistory } from '@/lib/pix/database';

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('sessionId');
    if (!sessionId) {
      return NextResponse.json({ messages: [], messageCount: 0 });
    }

    const history = await getConversationHistory(sessionId);
    return NextResponse.json(history);
  } catch (error) {
    console.error('History API error:', error);
    return NextResponse.json({ messages: [], messageCount: 0 });
  }
}
