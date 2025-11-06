import Script from 'next/script';
import { useRouter } from 'next/router';

type BreadcrumbProps = {
  siteUrl: string;
};

const Breadcrumb = ({ siteUrl }: BreadcrumbProps) => {
  // const router = useRouter();
  // const pathArray = router.asPath.split('/').filter(p => p);

  // const breadcrumbList = pathArray.map((slug, index) => ({
  //   '@type': 'ListItem',
  //   'position': index + 1,
  //   'name': slug.replace(/-/g, ' ').toUpperCase(),
  //   'item': `${process.env.NEXT_PUBLIC_SITE_URL}/${pathArray.slice(0, index + 1).join('/')}`,
  // }));

  // const breadcrumbSchema = {
  //   '@context': 'https://schema.org',
  //   '@type': 'BreadcrumbList',
  //   'itemListElement': breadcrumbList.map(item => ({
  //     '@type': 'ListItem',
  //     'position': item.position,
  //     'name': item.name,
  //     'item': `${siteUrl}${item.href}`,
  //   })),
  // };

  // console.log('Server breadcrumbSchema:', JSON.stringify(breadcrumbSchema, null, 2));

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          'itemListElement': [
            {
              '@type': 'WebPage',
              'url': 'https://pixelettetech.com/dedicated-team-services',
              'name': 'Dedicated Team Services',
              'dateModified': '2025-03-18T17:38:14.982Z',
            },
            {
              '@type': 'WebPage',
              'url': 'https://pixelettetech.com/it-outsourcing-services',
              'name': 'IT Outsourcing Services',
              'dateModified': '2025-03-18T17:38:14.982Z',
            },
            {
              '@type': 'WebPage',
              'url': 'https://pixelettetech.com/staff-augmentation-services',
              'name': 'Staff Augmentation Services',
              'dateModified': '2025-03-18T17:38:14.982Z',
            },
            {
              '@type': 'WebPage',
              'url': 'https://pixelettetech.com/ai-development-services',
              'name': 'AI Development Services',
              'dateModified': '2025-03-18T17:38:14.982Z',
            },
            {
              '@type': 'WebPage',
              'url': 'https://pixelettetech.com/ar-vr-development-services',
              'name': 'AR/VR Development Services',
              'dateModified': '2025-03-18T17:38:14.982Z',
            },
            {
              '@type': 'WebPage',
              'url': 'https://pixelettetech.com/blockchain-development-services',
              'name': 'Blockchain Development Services',
              'dateModified': '2025-03-18T17:38:14.982Z',
            },
            {
              '@type': 'WebPage',
              'url': 'https://pixelettetech.com/custom-software-development-services',
              'name': 'Custom Software Development Services',
              'dateModified': '2025-03-18T17:38:14.982Z',
            },
            {
              '@type': 'WebPage',
              'url': 'https://pixelettetech.com/mobile-app-development-services',
              'name': 'Mobile App Development Services',
              'dateModified': '2025-03-18T17:38:14.982Z',
            },
            {
              '@type': 'WebPage',
              'url': 'https://pixelettetech.com/ui-ux-design-services',
              'name': 'UI/UX Design Services',
              'dateModified': '2025-03-18T17:38:14.982Z',
            },
            {
              '@type': 'WebPage',
              'url': 'https://pixelettetech.com/web-development-services',
              'name': 'Web Development Services',
              'dateModified': '2025-03-18T17:38:14.982Z',
            },
          ],
        },
        ),
      }}
    />
  );
};

export default Breadcrumb;
