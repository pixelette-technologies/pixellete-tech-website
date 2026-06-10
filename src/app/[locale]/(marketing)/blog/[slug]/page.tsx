import { fetchAllBlogSlugs, fetchBlogMetadata } from '@/libs/contentful';
import BlogDetail from './BlogDetail';

export async function generateStaticParams() {
  const slugs = await fetchAllBlogSlugs(); // Fetch all blog slugs from Contentful
  return slugs.map(({ slug }) => ({
    // locale: 'en', // or dynamically add locales if needed
    slug, // Now guaranteed to be a string
  }));
}

type BlogPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: BlogPageProps) {
  const { slug } = await props.params;
  const metadata = await fetchBlogMetadata(slug);
  const canonical = `/blog/${slug}`;
  if (!metadata) {
    return { title: 'Blockchain Experts', description: 'Read more about blockchain topics.', alternates: { canonical } };
  }
  const rawTitle = metadata.title;
  const title = rawTitle.length <= 60
    ? rawTitle
    : `${rawTitle.slice(0, rawTitle.lastIndexOf(' ', 57))}…`;
  return { ...metadata, title, alternates: { canonical } };
}

export default async function BlogDetailPage(props: BlogPageProps) {
  const params = await props.params;
  return <BlogDetail params={params} />;
}
