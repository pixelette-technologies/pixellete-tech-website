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
