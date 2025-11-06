import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pixelettetech.com';
  
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/api/sitemap`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 