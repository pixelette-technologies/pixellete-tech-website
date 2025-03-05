import type { Metadata } from 'next';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import arcjet, { detectBot, request } from '@/libs/Arcjet';
import { Env } from '@/libs/Env';
import { routing } from '@/libs/i18nNavigation';
import { GoogleTagManager } from '@next/third-parties/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Outfit } from 'next/font/google';
import { notFound } from 'next/navigation';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/images/logo/short-logo-purple.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/images/logo/short-logo-purple.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/images/logo/short-logo-purple.png',
    },
    {
      rel: 'icon',
      url: '/images/logo/short-logo-purple.png',
    },
  ],
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

// Improve security with Arcjet
const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    // Block all bots except the following
    allow: [
      // See https://docs.arcjet.com/bot-protection/identifying-bots
      'CATEGORY:SEARCH_ENGINE', // Allow search engines
      'CATEGORY:PREVIEW', // Allow preview links to show OG images
      'CATEGORY:MONITOR', // Allow uptime monitoring services
    ],
  }),
);

const outfit = Outfit({
  weight: ['100', '300', '400', '600', '900'],
  subsets: ['latin'],
  variable: '--font-outfit',
});

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Verify the request with Arcjet
  if (Env.ARCJET_KEY) {
    const req = await request();
    const decision = await aj.protect(req);

    // These errors are handled by the global error boundary, but you could also
    // redirect or show a custom error page
    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        throw new Error('No bots allowed');
      }

      throw new Error('Access denied');
    }
  }

  // Using internationalization in Client Components
  const messages = await getMessages();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pixelettetech.com'}/${locale}`;

  return (
    <html lang={locale} data-theme="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Company',
              'name': 'Pixelette Technologies',
              'url': 'https://www.pixelettetech.com',
              'logo': 'https://pixelettetech.com/images/company/logo.svg',
              'sameAs': [
                'https://www.instagram.com/pixelettetechnologies',
                'https://www.facebook.com/pixelette.technologies',
                'https://x.com/Pixelette__Tech',
                'https://www.linkedin.com/company/pixelettetechnologies/',
                'https://www.youtube.com/channel/UCikfbjKTZ22-J4utsb9pzNg',
              ],
              'description': 'Cutting-edge AI & Blockchain solutions. Custom AI, blockchain consulting, metaverse integration. Innovative & impactful results for your business.',
            }),
          }}
        />
        <link rel="canonical" href={canonicalUrl} />
      </head>
      <body className={`${outfit.className}`} style={{ overflowX: 'auto', overflowY: 'auto' }}>
        <GoogleTagManager gtmId="GTM-KXC3K4RL" />
        {/* <ThemeProvider attribute="class"> */}
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <Breadcrumb siteUrl={process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pixelettetech.com'} />
          {props.children}
          {/* <DemoBadge /> */}
        </NextIntlClientProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
