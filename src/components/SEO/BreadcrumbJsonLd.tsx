import { buildBreadcrumbSchema } from '@/utils/schema-helpers';

type Item = { name: string; path: string };

export default function BreadcrumbJsonLd({ items }: { items: Item[] }) {
  const schema = buildBreadcrumbSchema(items);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
