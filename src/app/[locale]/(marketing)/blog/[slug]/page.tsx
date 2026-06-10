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

// Clamp a title to <=60 characters on a word boundary. Returned as an
// `absolute` title so the layout's `%s | Pixelette Technologies` template does
// NOT append the 25-char brand suffix and push it back over the 50-60 target
// (audit P1-02). The post topic carries the keyword (P1-03).
function clampTitle(raw: string): string {
  if (raw.length <= 60) {
    return raw;
  }
  const cut = raw.slice(0, raw.lastIndexOf(' ', 58)).trimEnd();
  return `${cut}…`;
}

export async function generateMetadata(props: BlogPageProps) {
  const { slug } = await props.params;
  const metadata = await fetchBlogMetadata(slug);
  const canonical = `/blog/${slug}`;
  const url = `https://pixelettetech.com/blog/${slug}`;
  if (!metadata) {
    return {
      title: { absolute: 'Blog | Pixelette Technologies' },
      description: 'Read more about blockchain topics.',
      alternates: { canonical },
    };
  }
  const title = clampTitle(metadata.title);
  return {
    title: { absolute: title },
    description: metadata.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: metadata.description,
      type: 'article',
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metadata.description,
    },
  };
}

export default async function BlogDetailPage(props: BlogPageProps) {
  const params = await props.params;
  return <BlogDetail params={params} />;
}
