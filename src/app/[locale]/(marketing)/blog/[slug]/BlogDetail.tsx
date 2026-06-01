import Breadcrumb from '@/components/Feature/Breadcrumb/Breadcrumb';
import { Container } from '@/components/Feature/Container/Container';
import { fetchBlogBySlug } from '@/libs/fetchBlogBySlug';
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

  // Article structured data (JSON-LD), emitted server-side so search engines and
  // AI answer engines can read it. Addresses the blog's missing schema and the
  // E-E-A-T date/author signals (audit P1-21 / P4-03 / P6-19).
  const thumbnailUrl = (blog?.fields?.thumbnailImage as any)?.fields?.file?.url as string | undefined;
  const authorName = resolvedAuthor?.fields?.name as string | undefined;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': blog?.fields?.title,
    'description': blog?.fields?.description,
    'datePublished': blog?.sys?.createdAt,
    'dateModified': blog?.sys?.updatedAt,
    'author': authorName
      ? { '@type': 'Person', 'name': authorName }
      : { '@type': 'Organization', 'name': 'Pixelette Technologies' },
    'publisher': {
      '@type': 'Organization',
      'name': 'Pixelette Technologies',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://pixelettetech.com/assets/common/logo.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://pixelettetech.com/blog/${params.slug}`,
    },
    ...(thumbnailUrl ? { image: [`https:${thumbnailUrl}`] } : {}),
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: blog?.fields?.title || 'Blog Post', href: `/blog/${params.slug}` },
  ];

  return (
    <div className="blog_detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
