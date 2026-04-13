import axios from 'axios';
import * as cheerio from 'cheerio';

interface ScrapedContent {
  url: string;
  title: string;
  description: string;
  h1: string;
  h2s: string[];
  bodyText: string;
  summary: string;
}

export async function scrapeWebsite(url: string): Promise<ScrapedContent | null> {
  try {
    const response = await axios.get(url, {
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PixBot/1.0; +https://pixelettetech.com)',
      },
      maxRedirects: 3,
    });

    const $ = cheerio.load(response.data);

    $('script, style, nav, footer, header, noscript, iframe').remove();

    const title = $('title').text().trim();
    const description = $('meta[name="description"]').attr('content')?.trim() || '';
    const h1 = $('h1').first().text().trim();
    const h2s = $('h2').slice(0, 5).map((_, el) => $(el).text().trim()).get();
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 800);

    const summary = `${title}. ${description}. ${h1}`;

    return { url, title, description, h1, h2s, bodyText, summary };
  } catch {
    return null;
  }
}

export function extractUrlFromMessage(text: string): string | null {
  const urlRegex = /https?:\/\/[^\s<>"']+|www\.[^\s<>"']+/i;
  const match = text.match(urlRegex);
  if (!match) return null;
  let url = match[0];
  if (url.startsWith('www.')) url = 'https://' + url;
  return url;
}
