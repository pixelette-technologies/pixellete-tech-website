import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Feature/Breadcrumb/Breadcrumb';
import { Container } from '@/components/Feature/Container/Container';
import { getAuthor } from '@/data/authors';
import { getBanner } from '@/data/blog-banners';
import { getBlogBySlugWithMDX } from '@/lib/blog';
import { BlogContent } from './components/BlogContent';
import { BlogHeader } from './components/BlogHeader';
import { BlogMedia } from './components/BlogMedia';
import { SideBanner } from './components/SideBanner';
import { TableOfContents } from './components/TableOfContents';
import './blogdetail.scss';

type BlogDetailProps = {
  params: { slug: string };
};

export default async function BlogDetail({ params }: BlogDetailProps) {
  const blog = await getBlogBySlugWithMDX(params.slug);

  if (!blog) {
    notFound();
  }

  const { frontmatter, content, toc } = blog;
  const author = getAuthor(frontmatter.author);
  const preBlogBanner = getBanner(frontmatter.preBlogBanner);
  const sideBanner = getBanner(frontmatter.sideBannerAd);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: frontmatter.title, href: `/blog/${params.slug}` },
  ];

  return (
    <div className="blog_detail">
      <Container className="main">
        <div className="cardSectionBackground">
          <img src="/images/aiServices/serviceSectionBackground.svg" alt="" />
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
                title={frontmatter.title}
                author={author}
                publishDate={frontmatter.publishDate}
                updatedDate={frontmatter.updatedDate}
                readTime={frontmatter.readTime}
              />

              <BlogMedia
                thumbnailImage={frontmatter.thumbnailImage}
                title={frontmatter.title}
              />

              <TableOfContents items={toc} />

              <BlogContent
                content={content}
                preBlogBanner={preBlogBanner}
              />
            </div>

            <div className="blog-sidebar side-banner-container">
              <SideBanner banner={sideBanner} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
