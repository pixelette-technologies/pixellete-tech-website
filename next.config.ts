import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';
import './src/libs/Env';

const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
export default withSentryConfig(
  bundleAnalyzer(
    withNextIntl({
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
        deviceSizes: [320, 420, 768, 1024, 1200], // Define appropriate device sizes
        imageSizes: [16, 32, 48, 64, 128, 256, 512], // Image sizes for optimization
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

        ];
      },
    }),
  ),
  {
    // Sentry configuration options
    org: 'pixelette-tech',
    project: 'pixelette-tech',
    silent: !process.env.CI,
    widenClientFileUpload: true,
    reactComponentAnnotation: {
      enabled: true,
    },
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
    telemetry: false,
  },
);
