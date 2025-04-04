'use client';
import type { Entry } from 'contentful';
import Breadcrumb from '@/components/Feature/Breadcrumb/Breadcrumb';
import { Container } from '@/components/Feature/Container/Container';
import { BLOCKS } from '@contentful/rich-text-types';
import { useEffect, useState } from 'react';
import useContentful from '../../api/usecontentful/usecontentful';
import { BlogContent } from './components/BlogContent';
import { BlogHeader } from './components/BlogHeader';
import { BlogMedia } from './components/BlogMedia';
import { SideBanner } from './components/SideBanner';
import { TableOfContents } from './components/TableOfContents';
import './blogdetail.scss';

export default function BlogDetail({ slug }: { slug: string }) {
  const { getOneAssest } = useContentful();
  const [selectedData, setSelectedData] = useState<any>({});
  const [resolvedAssets, setResolvedAssets] = useState<any[]>([]);
  const [resolvedAuthor, setResolvedAuthor] = useState<any>({});
  const [content, setContent] = useState<any>();
  const [preContent, setPreContent] = useState<any>();
  const [tableOfContents, setTableOfContents] = useState<any[]>([]);

  useEffect(() => {
    if (slug) {
      getOneAssest({ slug }).then((response) => {
        if (response !== undefined) {
          const { blogsPage, includes } = response;
          setSelectedData(blogsPage);
          setContent(blogsPage.fields.body);
          setPreContent(includes?.Entry?.find((entry: Entry<any>) => entry.sys.id === blogsPage?.fields.preBlogBanner?.sys.id));
          extractTOC(blogsPage.fields.body);
          setResolvedAssets(includes?.Asset);
          const blogAuthorId = blogsPage?.fields.author?.sys.id;
          setResolvedAuthor(includes?.Entry?.find((entry: Entry<any>) => entry.sys.id === blogAuthorId));
        }
      });
    }
  }, [slug]);

  const extractTOC = (body: any) => {
    const headings: any[] = [];
    body?.content?.forEach((node: any) => {
      if (node.nodeType === BLOCKS.HEADING_2) {
        headings.push({
          text: node.content[0]?.value,
          id: node.content[0]?.value.replace(/\s+/g, '-').toLowerCase(),
        });
      }
    });
    setTableOfContents(headings);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: selectedData?.fields?.title || 'Blog Post', href: `/blog/${slug}` },
  ];

  return (
    <div className="blog_detail">
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
                title={selectedData?.fields?.title}
                author={resolvedAuthor}
                updatedAt={selectedData?.sys?.updatedAt}
              />
              <BlogMedia thumbnailImage={selectedData?.fields?.thumbnailImage} />
              <TableOfContents items={tableOfContents} />
              <BlogContent
                content={content}
                resolvedAssets={resolvedAssets}
                preBlogBanner={preContent}
              />
            </div>
            <div className="blog-sidebar side-banner-container">
              <SideBanner
                sideBannerAd={selectedData?.fields?.sideBannerAd}
                resolvedAssets={resolvedAssets}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
