import { NextRequest, NextResponse } from 'next/server';
import { generateAndSendWeeklyReport } from '@/lib/pix/weeklyReport';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const expectedToken = `Bearer ${process.env.CRON_SECRET}`;

    if (!authHeader || authHeader !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await generateAndSendWeeklyReport();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Weekly report error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
