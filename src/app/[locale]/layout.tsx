import type { Metadata } from 'next';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import { routing } from '@/libs/i18nNavigation';
import { GoogleTagManager } from '@next/third-parties/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Outfit } from 'next/font/google';
import { notFound } from 'next/navigation';
import PixLoader from '@/components/pix/PixLoader';
import { Suspense } from 'react';
import '@/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://pixelettetech.com'),
  title: {
    default: 'Pixelette Technologies | Enterprise AI & Blockchain Development',
    template: '%s | Pixelette Technologies',
  },
  description: 'APPG AI Secretariat. ISO 9001 & ISO 27001 certified. 200+ products shipped across 13 countries. Enterprise AI, blockchain and custom software development.',
  openGraph: {
    siteName: 'Pixelette Technologies',
    locale: 'en_GB',
    type: 'website',
    images: [{
      url: '/og/homepage.png',
      width: 1200,
      height: 630,
      alt: 'Pixelette Technologies — Enterprise AI & Blockchain Development',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/homepage.png'],
  },
  icons: [
    { rel: 'apple-touch-icon', url: '/images/logo/short-logo-purple.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/images/logo/short-logo-purple.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/images/logo/short-logo-purple.png' },
    { rel: 'icon', url: '/images/logo/short-logo-purple.png' },
  ],
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

const outfit = Outfit({
  weight: ['100', '300', '400', '600', '900'],
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
});

async function MessagesProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  const messages = await getMessages().catch(() => ({}));

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Breadcrumb siteUrl={process.env.NEXT_PUBLIC_SITE_URL || 'https://pixelettetech.com'} />
      {children}
    </NextIntlClientProvider>
  );
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Organization structured data (SEOMATE audit P6-19): site-wide entity schema
  // so search + LLMs resolve the brand. NAP from the verified Google Business
  // Profile; sameAs left for the team to extend with social profiles.
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Pixelette Technologies',
    'url': 'https://pixelettetech.com',
    'logo': 'https://pixelettetech.com/images/logo/short-logo-purple.png',
    'description': 'Enterprise AI, blockchain and custom software development. APPG AI Secretariat; ISO 9001 & ISO 27001 certified.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '71-75 Shelton Street',
      'addressLocality': 'London',
      'postalCode': 'WC2H 9JQ',
      'addressCountry': 'GB',
    },
    'telephone': '+44 20 4518 8226',
  };

  return (
    <html lang={locale} data-theme="dark">
      <head>
        <GoogleTagManager gtmId="GTM-KXC3K4RL" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${outfit.className}`} style={{ overflowX: 'hidden', overflowY: 'auto' }}>
        <Suspense fallback={(
          <div className="flex min-h-screen items-center justify-center">
            <img loading="lazy"
              src="/images/logo/shortLogo.svg"
              alt="Loading..."
              className="size-16 animate-pulse"
            />
          </div>
        )}
        >
          <MessagesProvider locale={locale}>
            {children}
          </MessagesProvider>
        </Suspense>
        <PixLoader />
      </body>
    </html>
  );
}
