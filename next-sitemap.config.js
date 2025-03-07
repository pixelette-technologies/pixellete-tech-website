const fs = require('node:fs');
const path = require('node:path');
const { createClient } = require('contentful');

// Fetch dynamic blog paths from Contentful
async function fetchBlogPaths() {
  const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  const client = createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
  });

  const entries = await client.getEntries({ content_type: 'blogsPage' });
  return entries.items.map(entry => `/blog/${entry.fields.slug}`);
}

// Fetch static paths dynamically from the Next.js `app` directory
function getStaticPaths() {
  const appDir = path.join(process.cwd(), 'src/app');
  const staticPaths = [];

  function readDirRecursively(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);

      if (fs.statSync(filePath).isDirectory()) {
        readDirRecursively(filePath);
      } else if (
        file === 'page.js'
        || file === 'page.tsx' // Handle page files in the App Router
      ) {
        // Convert file path to route
        let route = filePath
          .replace(appDir, '')
          .replace(/\\/g, '/')
          .replace(/\/page\.js$|\/page\.tsx$/, '');

        if (route === '') {
          route = '/';
        } // Adjust root route
        staticPaths.push(route);
      }
    });
  }

  readDirRecursively(appDir);
  return staticPaths;
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://pixelettetech.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.8,
  sitemapSize: 5000,
  generateIndexSitemap: true,
  // outDir: 'out',
  async additionalPaths(config) {
    const blogPaths = await fetchBlogPaths();
    const staticPaths = getStaticPaths();

    // Combine static and dynamic paths
    const combinedPaths = [...staticPaths, ...blogPaths];

    return combinedPaths.map(path => ({
      loc: path,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
