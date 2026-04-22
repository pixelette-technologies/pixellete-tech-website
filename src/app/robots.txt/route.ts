export const dynamic = 'force-static';

export function GET() {
  const baseUrl = 'https://pixelettetech.com';

  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    '',
    'User-agent: ChatGPT-User',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    'User-agent: Claude-Web',
    'Allow: /',
    '',
    'User-agent: anthropic-ai',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    'User-agent: Perplexity-User',
    'Allow: /',
    '',
    'User-agent: Google-Extended',
    'Allow: /',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    '',
    'User-agent: CCBot',
    'Allow: /',
    '',
    'User-agent: Bytespider',
    'Disallow: /',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
