import { fetchAllBlogSlugs, fetchBlogMetadata } from '@/libs/contentful';
import BlogDetail from './BlogDetail';

export async function generateStaticParams() {
  const slugs = await fetchAllBlogSlugs(); // Fetch all blog slugs from Contentful
  return slugs.map(({ slug }) => ({
    // locale: 'en', // or dynamically add locales if needed
    slug, // Now guaranteed to be a string
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const metadata = await fetchBlogMetadata(params.slug);
  const canonical = `/blog/${params.slug}`;
  return metadata
    ? { ...metadata, alternates: { canonical } }
    : { title: 'Blockchain Experts', description: 'Read more about blockchain topics.', alternates: { canonical } };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return <BlogDetail params={params} />;
}
