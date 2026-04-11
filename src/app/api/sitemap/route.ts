import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.redirect(
    'https://pixelettetech.com/sitemap.xml',
    { status: 301 },
  );
}
