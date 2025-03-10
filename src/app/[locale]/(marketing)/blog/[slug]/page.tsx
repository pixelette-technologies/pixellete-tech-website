import { fetchAllBlogSlugs, fetchBlogMetadata } from '../../api/usecontentful/usecontentful';
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
  return metadata || { title: 'Blockchain Experts', description: 'Read more about blockchain topics.' };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return <BlogDetail slug={params.slug} />;
}
