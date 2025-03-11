import type { Metadata } from 'next';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import { routing } from '@/libs/i18nNavigation';
import { GoogleTagManager } from '@next/third-parties/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Outfit } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import '@/styles/global.css';

export const metadata: Metadata = {
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
});

// Async Messages Provider (Avoid blocking UI)
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

  return (
    <html lang={locale} data-theme="dark">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://pixelettetech.com'} />
      </head>
      <body className={`${outfit.className}`} style={{ overflowX: 'auto', overflowY: 'auto' }}>
        <GoogleTagManager gtmId="GTM-KXC3K4RL" />
        <Suspense>
          <MessagesProvider locale={locale}>{children}</MessagesProvider>
        </Suspense>
      </body>
    </html>
  );
}
