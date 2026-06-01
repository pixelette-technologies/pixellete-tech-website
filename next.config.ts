import createNextIntlPlugin from 'next-intl/plugin';
import './src/libs/Env';

const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');

// const bundleAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// });

/** @type {import('next').NextConfig} */
export default
// withSentryConfig(
// bundleAnalyzer(
withNextIntl({
  // output: 'export',
  // trailingSlash: true,
  eslint: {
    dirs: ['.'], // Enable linting in these directories
    ignoreDuringBuilds: true, // Skip ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript type-checking during builds
  },
  poweredByHeader: false,
  reactStrictMode: true,
  serverExternalPackages: ['@electric-sql/pglite'],
  images: {
    loader: 'default', // Default loader
    domains: ['images.ctfassets.net', 'ui-avatars.com'], // Add domains you're using images from
    deviceSizes: [320, 420, 768, 1024, 1200, 640, 750, 1080, 1920], // Define appropriate device sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 512], // Image sizes for optimization
    formats: ['image/avif', 'image/webp'], // Serve AVIF (then WebP) for next/image - smaller files (audit P2-31)
  },
  async redirects() {
    return [
      {
        source: '/deliver',
        destination: '/it-outsourcing-services',
        permanent: true,
      },
      {
        source: '/supplement',
        destination: '/staff-augmentation-services',
        permanent: true,
      },
      {
        source: '/deploy',
        destination: '/dedicated-team-services',
        permanent: true,
      },
      {
        source: '/blogs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/start-ups',
        destination: '/startup-funding',
        permanent: true,
      },
      {
        source: '/ai-services',
        destination: '/ai-development-services',
        permanent: true,
      },
      {
        source: '/blockchain-development',
        destination: '/blockchain-development-services',
        permanent: true,
      },
      {
        source: '/vr-ar',
        destination: '/ar-vr-development-services',
        permanent: true,
      },
      {
        source: '/web-development',
        destination: '/web-development-services',
        permanent: true,
      },
      {
        source: '/mobile-development',
        destination: '/mobile-app-development-services',
        permanent: true,
      },
      {
        source: '/custome-software-development',
        destination: '/custom-software-development-services',
        permanent: true,
      },
      {
        source: '/ui-ux',
        destination: '/ui-ux-design-services',
        permanent: true,
      },
      {
        source: '/ui-ux-design',
        destination: '/ui-ux-design-services',
        permanent: true,
      },
      {
        source: '/food-delivery-app-case-study',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/food-delivery-app-case-study',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/case-study/3eKvdUcg042cCmUYqEm2XF',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/media-pulse-multi-client-dashboards',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/chillow-roommate-finder-mobile-application',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/extract-your-competitors-leads-stealthily-with-the-marketing-zeus',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/decentralised-marketplaces-and-the-future-of-online',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/smart-contract-audits-best-practices-and-common-pitfalls',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/central-bank-digital-currencies-blockchain-adoption',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/decentralized-autonomous-organization-dao',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/exciting-world-of-nft-art-galleries',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/dphq-parking-dashboard-development',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/microsoft-announces-windows-11-generally-available-by-the-holidays',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/h1-headings-over-50-of-seos-doing-it-wrong',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/search-engine-optimization',
        destination: '/',
        permanent: true,
      },
      {
        source: '/assessment',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/java-web-development',
        destination: '/custom-software-development-services',
        permanent: true,
      },
      {
        source: '/blockchain-game-development',
        destination: '/blockchain-development-services',
        permanent: true,
      },
      {
        source: '/top-3-platforms-for-b2b-e-commerce-development/3-2',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/services/local-seo-service',
        destination: '/',
        permanent: true,
      },
      {
        source: '/beginners-guide-to-decentralised-exchange',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/ai-discovery',
        destination: '/ai-development-services',
        permanent: true,
      },
      {
        source: '/top-7-python-development-companies',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/smart-contract-audits-improving-the-transparency-trust',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/case-study/4Sg5IqN7KjazSQw8dWw1VJ',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/robotics',
        destination: '/',
        permanent: true,
      },
      {
        source: '/refund-policy',
        destination: '/cancelation-refund-policy',
        permanent: true,
      },
      {
        source: '/case-study/201',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/services/ios-app-development',
        destination: '/mobile-app-development-services',
        permanent: true,
      },
      {
        source: '/tiktok-adds-new-preview-option-to-show-how-your-clips-will-look-in-the-app',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/features-laravel-ecommerce-plugin-services',
        destination: '/web-development-services',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/',
        permanent: true,
      },
      {
        source: '/reasons-to-choose-java-web-development-services',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/services/blockchain-solutions',
        destination: '/blockchain-development-services',
        permanent: true,
      },
      {
        source: '/does-google-gives-preference-to-content-above-the-fold',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/offers/get-laravel-based-website-with-free-seo-social-media-marketing',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/web-airo-bounce',
        destination: '/',
        permanent: true,
      },
      {
        source: '/purpose-of-statistical-inference-in-ai-machine-learning',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/a-hacking-group-carry-out-the-competition-to-find-new-cryptocurrency-hacks',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/uiux-case-study-2',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/googles-john-mueller-sometimes-theres-no-seo-solution',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/vr-development-services',
        destination: '/ar-vr-development-services',
        permanent: true,
      },
      {
        source: '/what-do-web-development-services-include',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/vr-game-development-services',
        destination: '/ar-vr-development-services',
        permanent: true,
      },
      {
        source: '/tokenization-development',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/reinforcement-learning',
        destination: '/',
        permanent: true,
      },
      {
        source: '/as-part-of-windows-11-microsoft-has-added-dns-over-https',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/nft-development',
        destination: '/',
        permanent: true,
      },
      {
        source: '/secure-your-nfts-with-top-rated-wallet-app',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/googles-last-minute-advice-on-the-page-experience-update',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/services/php-development',
        destination: '/web-development-services',
        permanent: true,
      },
      {
        source: '/nft-minting-platform',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/front-end-development',
        destination: '/web-development-services',
        permanent: true,
      },
      {
        source: '/recommender-systems',
        destination: '/',
        permanent: true,
      },
      {
        source: '/derivative',
        destination: '/',
        permanent: true,
      },
      {
        source: '/vr-marketing-and-advertising',
        destination: '/ar-vr-development-services',
        permanent: true,
      },
      {
        source: '/digital-marketing-services',
        destination: '/',
        permanent: true,
      },
      {
        source: '/smart-contract-audits-ensuring-the-security-of-your-blockchain-applications',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/ai-services-and-solutions',
        destination: '/ai-development-services',
        permanent: true,
      },
      {
        source: '/key-reasons-why-web-development-services-are-important',
        destination: '/blog',
        permanent: true,
      },
      // {
      //   source: '/blockchain-development-services',
      //   destination: '/blockchain-development-services',
      //   permanent: true,
      // },
      {
        source: '/vr-architectural-visualisation',
        destination: '/ar-vr-development-services',
        permanent: true,
      },
      {
        source: '/cloud-computing-empowering-businesses',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/nft-launchpad',
        destination: '/',
        permanent: true,
      },
      {
        source: '/best-nft-art-galleries-to-keep-an-eye-on',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/security-token-offerings-navigating-the-risks-and-rewards',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/about-akashic-knowing',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/mobile-app-development',
        destination: '/mobile-app-development-services',
        permanent: true,
      },
      {
        source: '/ethical-considerations-in-ai-blockchain',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/customizable-nft-marketplace-development',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/case-study/102',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/cancellation-and-refund-policy',
        destination: '/cancellation-refund-policy',
        permanent: true,
      },
      {
        source: '/cancelation-refund-policy',
        destination: '/cancellation-refund-policy',
        permanent: true,
      },
      {
        source: '/terms-condition',
        destination: '/terms-conditions',
        permanent: true,
      },
    ];
  },
});
//  ,
// );
//   ,
//   {
//     // Sentry configuration options
//     org: 'pixelette-tech',
//     project: 'pixelette-tech',
//     silent: !process.env.CI,
//     widenClientFileUpload: true,
//     reactComponentAnnotation: {
//       enabled: true,
//     },
//     tunnelRoute: '/monitoring',
//     hideSourceMaps: true,
//     disableLogger: true,
//     automaticVercelMonitors: true,
//     telemetry: false,
//   },
// );
