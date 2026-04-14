import { NextRequest, NextResponse } from 'next/server';
import { saveVisitorRating } from '@/lib/pix/database';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, rating, comment } = await req.json();

    if (!sessionId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating' }, { status: 400 });
    }

    await saveVisitorRating(sessionId, rating, comment);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Rating API error:', error);
    return NextResponse.json({ error: 'Failed to save rating' }, { status: 500 });
  }
}
