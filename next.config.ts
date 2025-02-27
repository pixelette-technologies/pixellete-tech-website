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
            source: '/deliver', // Old URL
            destination: '/it-outsourcing-services', // New URL
            permanent: true, // Permanent redirect (301)
          },
          {
            source: '/supplement', // Old URL
            destination: '/staff-augmentation-services', // New URL
            permanent: true, // Permanent redirect (301)
          },
          {
            source: '/deploy', // Another old URL
            destination: '/dedicated-team-services', // Another new URL
            permanent: true,
          },
          {
            source: '/blogs', // Another old URL
            destination: '/blog', // Another new URL
            permanent: true,
          },
          {
            source: '/start-ups', // Another old URL
            destination: '/startup-funding', // Another new URL
            permanent: true,
          },
          {
            source: '/ai-services', // Another old URL
            destination: '/ai-development-services', // Another new URL
            permanent: true,
          },
          {
            source: '/blockchain-development', // Another old URL
            destination: '/blockchain-development-services', // Another new URL
            permanent: true,
          },
          {
            source: '/vr-ar', // Another old URL
            destination: '/ar-vr-development-services', // Another new URL
            permanent: true,
          },
          {
            source: '/web-development', // Another old URL
            destination: '/web-development-services', // Another new URL
            permanent: true,
          },
          {
            source: '/mobile-development', // Another old URL
            destination: '/mobile-app-development-services', // Another new URL
            permanent: true,
          },
          {
            source: '/custome-software-development', // Another old URL
            destination: '/custom-software-development-services', // Another new URL
            permanent: true,
          },
          {
            source: '/ui-ux', // Another old URL
            destination: '/ui-ux-design-services', // Another new URL
            permanent: true,
          },
          // Add more redirects as needed
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
