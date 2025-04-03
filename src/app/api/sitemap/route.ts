import { createClient } from 'contentful';
import { NextResponse } from 'next/server';
import caseStudiesData from '@/data/caseStudies/caseStudiesData';

// Function to fetch blog paths from Contentful
async function fetchBlogPaths() {
  const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  if (!SPACE_ID || !ACCESS_TOKEN) {
    console.warn('Missing Contentful credentials, skipping blog paths.');
    return [];
  }

  const client = createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
  });

  const entries = await client.getEntries({ content_type: 'blogsPage' });
  return entries.items.map(entry => `/blog/${entry.fields.slug}`);
}

// Function to generate XML sitemap
function generateSitemapXML(urls: string[]) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pixelettetech.com';
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `
        <url>
          <loc>${baseUrl}${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`;

  return xml;
}

export async function GET() {
  try {
    // Fetch blog paths from Contentful
    const blogPaths = await fetchBlogPaths();
    
    // Get case study paths
    const caseStudyPaths = caseStudiesData.map(study => `/case-studies/${study.slug}`);
    
    // Combine all paths
    const allPaths = [...blogPaths, ...caseStudyPaths];
    
    // Generate XML sitemap
    const sitemapXML = generateSitemapXML(allPaths);
    
    // Return the sitemap with proper XML content type
    return new NextResponse(sitemapXML, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
} 