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

    // Differentiate priority by page importance. Previously every URL got a
    // blanket 0.7, which gives crawlers no signal about which pages matter most
    // (SEOMATE audit P2-42). Homepage 1.0 / commercial core 0.8 / blog 0.6 /
    // utility 0.3.
    const priorityFor = (p) => {
      if (p === '/') {
        return 1.0;
      }
      if (/^\/(about-us|contact-us|privacy-policy|terms)/.test(p)) {
        return 0.3;
      }
      if (p.startsWith('/blog')) {
        return 0.6;
      }
      return 0.8; // service / how-it-work / solution pages: the commercial core
    };

    return {
      loc: cleanPath,
      changefreq: cleanPath.startsWith('/blog') ? 'monthly' : config.changefreq,
      priority: priorityFor(cleanPath),
      lastmod: new Date().toISOString(),
    };
  },
};
