import Script from 'next/script';

type BreadcrumbProps = {
  siteUrl: string;
};

const Breadcrumb = ({ siteUrl }: BreadcrumbProps) => {
  const baseUrl = siteUrl.replace(/\/$/, '');

  const pages = [
    { url: '/dedicated-team-services', name: 'Dedicated Team Services' },
    { url: '/it-outsourcing-services', name: 'IT Outsourcing Services' },
    { url: '/staff-augmentation-services', name: 'Staff Augmentation Services' },
    { url: '/ai-development-services', name: 'AI Development Services' },
    { url: '/ar-vr-development-services', name: 'AR/VR Development Services' },
    { url: '/blockchain-development-services', name: 'Blockchain Development Services' },
    { url: '/custom-software-development-services', name: 'Custom Software Development Services' },
    { url: '/mobile-app-development-services', name: 'Mobile App Development Services' },
    { url: '/ui-ux-design-services', name: 'UI/UX Design Services' },
    { url: '/web-development-services', name: 'Web Development Services' },
  ];

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': pages.map((page, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': page.name,
            'item': `${baseUrl}${page.url}`,
          })),
        }),
      }}
    />
  );
};

export default Breadcrumb;
