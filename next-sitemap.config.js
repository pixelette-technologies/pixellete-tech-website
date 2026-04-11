/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pixelettetech.com',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  outDir: 'public',
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Strip /en/ prefix from all paths
    const cleanPath = path.replace(/^\/en/, '') || '/';

    // Exclude non-page routes from sitemap
    if (cleanPath === '/robots.txt' || cleanPath.startsWith('/api/')) {
      return null;
    }

    return {
      loc: cleanPath,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
