import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogSlugs } from '@/lib/blog';
import BlogDetail from './BlogDetail';

type RouteParams = {
  slug: string;
};

type PageProps = {
  params: Promise<RouteParams>;
};

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getBlogSlugs().map(slug => ({ slug }));
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found | Pixelette Technologies',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  const { frontmatter } = blog;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.publishDate,
      modifiedTime: frontmatter.updatedDate ?? frontmatter.publishDate,
      images: frontmatter.thumbnailImage
        ? [{ url: frontmatter.thumbnailImage }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.thumbnailImage ? [frontmatter.thumbnailImage] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetail params={{ slug }} />;
}
