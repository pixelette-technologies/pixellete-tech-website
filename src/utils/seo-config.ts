const SITE_URL = 'https://pixelettetech.com';

export const SEO_CONFIG = {
  siteUrl: SITE_URL,
  defaultOgImage: `${SITE_URL}/og/homepage.png`,

  organisation: {
    name: 'Pixelette Technologies',
    legalName: 'Pixelette Technologies Ltd',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/short-logo-purple.png`,
    description:
      'Enterprise AI, blockchain and custom software development. APPG AI Secretariat; ISO 9001 & ISO 27001 certified.',
    foundingDate: '2018',
  },

  contact: {
    email: 'sales@pixelettetech.com',
    telephoneUK: '+44 2045188226',
    telephoneUS: '+1 7732709034',
    addressUK: {
      streetAddress: '71-75 Shelton Street',
      addressLocality: 'London',
      postalCode: 'WC2H 9JQ',
      addressCountry: 'GB',
    },
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/pixelettetechnologies/',
    twitter: 'https://x.com/Pixelette__Tech',
    facebook: 'https://www.facebook.com/pixelette.technologies',
    instagram: 'https://www.instagram.com/pixelettetechnologies/',
    youtube: 'https://www.youtube.com/channel/UCikfbjKTZ22-J4utsb9pzNg',
  },

  publisher: {
    '@type': 'Organization' as const,
    'name': 'Pixelette Technologies',
    'logo': {
      '@type': 'ImageObject' as const,
      'url': `${SITE_URL}/images/logo/short-logo-purple.png`,
    },
  },
};

export function buildCanonicalUrl(path: string): string {
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalised}`;
}
