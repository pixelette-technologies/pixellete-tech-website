import { Blog } from '@/components/Blogging/Blog/Blog';
import { BLOG_CATEGORIES, getCategoryBySlug } from '@/data/seo/blog-categories';
import { fetchBlogsBySlugList } from '@/libs/contentful';
import { buildBreadcrumbSchema } from '@/utils/schema-helpers';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map(cat => ({ category: cat.slug }));
}

export async function generateMetadata(props: Props) {
  const { category: categorySlug } = await props.params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return {};
  }
  return {
    title: `${category.name} Articles | Pixelette Technologies`,
    description: category.description,
    alternates: { canonical: `https://pixelettetech.com/blog/category/${categorySlug}` },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage(props: Props) {
  const { locale, category: categorySlug } = await props.params;
  setRequestLocale(locale);

  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    notFound();
  }

  const blogs = await fetchBlogsBySlugList(category.postSlugs);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: category.name, path: `/blog/category/${categorySlug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Blog blogdata={blogs} />
    </>
  );
}
