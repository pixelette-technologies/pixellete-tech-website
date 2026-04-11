export const dynamic = 'force-static';

export function GET() {
  const baseUrl = 'https://pixelettetech.com';

  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    },
  );
}
