// components/Breadcrumb.tsx
'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

type BreadcrumbProps = {
  siteUrl: string; // Base URL of your website
};

type BreadcrumbItem = {
  name: string;
  href: string;
  position: number;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ siteUrl }) => {
  const pathname = usePathname();

  // Handle case where pathname is undefined
  if (!pathname) {
    return null;
  }

  // Split the current path into segments
  const segments = pathname.split('/').filter(seg => seg);

  // Generate breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = segments.map((segment, index) => ({
    name: decodeURIComponent(segment.replace(/-/g, ' ')), // Replace hyphens with spaces
    href: `/${segments.slice(0, index + 1).join('/')}`, // Construct breadcrumb URL
    position: index + 1,
  }));

  // JSON-LD for structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map(item => ({
      '@type': 'ListItem',
      'position': item.position,
      'name': item.name,
      'item': `${siteUrl}${item.href}`,
    })),
  };

  return (
    <Head>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </Head>
  );
};

export default Breadcrumb;
