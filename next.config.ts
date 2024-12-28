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
        dirs: ['.'],
      },
      poweredByHeader: false,
      reactStrictMode: true,
      serverExternalPackages: ['@electric-sql/pglite'],
      images: {
        loader: 'default', // Default loader
        domains: ['images.ctfassets.net'], // Add domains you're using images from
        deviceSizes: [320, 420, 768, 1024, 1200], // Define appropriate device sizes
        imageSizes: [16, 32, 48, 64, 128, 256, 512], // Image sizes for optimization
      },
      webpack(config, { isServer }) {
        if (!isServer) {
          // Custom rule to handle .wp2 images (WebP v2)
          config.module.rules.push({
            test: /\.wp2$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 10000, // Inline images smaller than 10kB as base64
                mimetype: 'image/wp2', // Correct MIME type for WebP
              },
            },
          });
        }
        return config;
      },
    }),
  ),
  {
    // Sentry configuration options
    org: 'nextjs-boilerplate-org',
    project: 'nextjs-boilerplate',
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
