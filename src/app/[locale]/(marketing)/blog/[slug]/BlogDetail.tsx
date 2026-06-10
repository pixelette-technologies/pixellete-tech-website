import Breadcrumb from '@/components/Feature/Breadcrumb/Breadcrumb';
import { Container } from '@/components/Feature/Container/Container';
import { fetchBlogBySlug } from '@/libs/fetchBlogBySlug';
import { buildBlogPostingSchema, buildBreadcrumbSchema } from '@/utils/schema-helpers';
import { BlogContent } from './components/BlogContent';
import { BlogHeader } from './components/BlogHeader';
import { BlogMedia } from './components/BlogMedia';
import { SideBanner } from './components/SideBanner';
import { TableOfContents } from './components/TableOfContents';
import './blogdetail.scss';

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const data = await fetchBlogBySlug(params.slug);

  if (!data) {
    return <div>Blog not found</div>;
  }

  const { blog, content, resolvedAuthor, resolvedAssets, preContent, tableOfContents } = data;

  // Structured data (JSON-LD), emitted server-side so search engines and AI
  // answer engines can read it. BlogPosting carries author/date/publisher E-E-A-T
  // signals; BreadcrumbList deepens sitewide schema coverage
  // (audit P1-22 / P6-19 / P1-47 / P4-03).
  const thumbnailUrl = (blog?.fields?.thumbnailImage as any)?.fields?.file?.url as string | undefined;
  const authorName = resolvedAuthor?.fields?.name as string | undefined;
  const blogTitle = (blog?.fields?.title as string) || 'Blog Post';
  const blogPostingSchema = buildBlogPostingSchema({
    slug: params.slug,
    title: blogTitle,
    description: (blog?.fields?.description as string) || '',
    imageUrl: thumbnailUrl ? `https:${thumbnailUrl}` : undefined,
    authorName,
    datePublished: blog?.sys?.createdAt,
    dateModified: blog?.sys?.updatedAt,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: blogTitle, path: `/blog/${params.slug}` },
  ]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: blogTitle, href: `/blog/${params.slug}` },
  ];

  return (
    <div className="blog_detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Container className="main">
        <div className="cardSectionBackground">
          <img src="/images/aiServices/serviceSectionBackground.svg" alt="Background" />
        </div>
      </Container>
      <div style={{ padding: '0 5rem' }} className="main margins">
        <div style={{ marginBottom: '2rem' }}>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div id="blog-top" className="blog_detail_inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4rem' }}>
            <div className="blog-main-content">
              <BlogHeader
                title={blog?.fields?.title}
                author={resolvedAuthor}
                updatedAt={blog?.sys?.updatedAt}
              />
              <BlogMedia thumbnailImage={blog?.fields?.thumbnailImage} />
              <TableOfContents items={tableOfContents} />
              <BlogContent
                content={content}
                resolvedAssets={resolvedAssets}
                preBlogBanner={preContent}
              />
            </div>
            <div className="blog-sidebar side-banner-container">
              <SideBanner
                sideBannerAd={blog?.fields?.sideBannerAd}
                resolvedAssets={resolvedAssets}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
