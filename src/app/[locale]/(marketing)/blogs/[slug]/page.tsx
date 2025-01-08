'use client';
import type { Text } from '@contentful/rich-text-types';
import type { Entry } from 'contentful';
import Breadcrumb from '@/components/Feature/Breadcrumb/Breadcrumb';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaGithub, FaGlobe, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';
import useContentful from '../../api/usecontentful/usecontentful';
// import './blogdetail.module.css';
import './blogdetail.scss'
import { Container } from '@/components/Feature/Container/Container';

const page = (props: any) => {
  const params = useParams();
  // const [contentfulData, setContentfulData] = useState<any>([{}]);
  const [playVideo, setPlayVideo] = useState<any>(false);
  const { getPosts, getAsset, getOneAssest } = useContentful();
  const [selectedData, setSelectedData] = useState<any>({});
  const [resolvedAssets, setResolvedAssets] = useState<any []>([]);
  const [resolvedAuthor, setResolvedAuthor] = useState<any>({});
  const [content, setContent] = useState<any>();
  const [tableOfContents, setTableOfContents] = useState<any[]>([]);

  const blogTitle = selectedData?.fields?.title || 'Blockchain Experts';
  const blogDescription = selectedData?.fields?.description || 'Read more about blockchain topics.';
  const blogSlug = selectedData?.fields?.slug;

  type BlogResponse = {
    blogData: any;
    assets: any;
    includes: any;
  };

  type Params = { id: string };

  useEffect(() => {
    if (params?.slug) {
      getOneAssest({ id: params.id }).then((response) => {
        if (response !== undefined) {
          const { blogData, includes } = response;
          setSelectedData(blogData);
          setContent(blogData.fields.body);
          extractTOC(blogData.fields.body);
          setResolvedAssets(includes?.Asset); // Save linked assets
          const blogAuthorId = blogData?.fields.blogAuthor?.sys.id;
          // console.log("blogauthor id: ",blogAuthorId);
          setResolvedAuthor(includes?.Entry?.find((entry: Entry<any>) => entry.sys.id === blogAuthorId));
        // console.log("blogauthor data: ",resolvedAuthor);
        }
      });
    }
  }, [params?.id]);

  useEffect(() => {
    document.title = blogTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', blogDescription);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = blogDescription;
      document.head.appendChild(newMeta);
    }
  }, [blogTitle, blogDescription]);

  // Handle scroll to TOC or top
  const scrollToTop = () => {
    const topElement = document.getElementById('blog-top');
    topElement?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const currentURL = typeof window !== 'undefined' ? window.location.href : '';
  const authorName = selectedData?.fields?.author?.fields?.name || 'Unknown Author';
  const authorTitle = selectedData?.fields?.author?.fields?.title || 'Author\'s title';
  const authorDescription = selectedData?.fields?.author?.fields?.description || 'No description available';
  const authorImage = selectedData?.fields?.author?.fields?.image?.fields?.file?.url || '/default-author.jpg'; // Default author image if not available

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: blogTitle as string, href: `/blog/${params?.id}` },
  ];

  const inferPlatform = (url: string): string => {
    if (url.includes('twitter.com')) {
      return 'Twitter';
    }
    if (url.includes('linkedin.com')) {
      return 'LinkedIn';
    }
    if (url.includes('github.com')) {
      return 'GitHub';
    }
    return 'Website'; // Default fallback
  };

  const getIcon = (url: string): JSX.Element => {
    if (url.includes('twitter.com')) {
      return <FaTwitter />;
    }
    if (url.includes('linkedin.com')) {
      return <FaLinkedin />;
    }
    if (url.includes('github.com')) {
      return <FaGithub />;
    }
    return <FaGlobe />; // Default icon for unknown platforms
  };

  const getTextContent = (node: any): string => {
    const textNode = node.content?.find((child: any) => 'value' in child) as Text | undefined;
    return textNode?.value || '';
  };

  return (
    <>
      {/* <Head>
        <title>{blogTitle}</title>
        <meta name="description" content={blogDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              // "headline": blog.title,
              // "datePublished": blog.publishedDate,
              // "author": {
              //   "@type": "Person",
              //   "name": blog.author.name,
              // },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://blockguard.com/blog/${params?.id}`,
              },
            }),
          }}
        />
      </Head> */}
      <div className="blog_detail">

        <Container className='main margins'>
          <div id="blog-top" className="blog_detail_inner">
            {/* Blog image or video */}
            {selectedData?.fields?.thumbnailImage?.fields?.file?.contentType?.split('/')[0]
            === 'video'
              ? (
                  <div>
                    {playVideo && playVideo
                      ? (
                          <div className="videoCard">
                            <video
                              width="320"
                              height="240"
                              controls
                              preload="none"
                              autoPlay
                              onEnded={() => setPlayVideo(false)}
                            >
                              <source src={`https:${selectedData.fields.thumbnailImage.fields.file.url}`} type="video/mp4" />
                            </video>
                          </div>
                        )
                      : (
                          <div className="videoCard">
                            <button
                              type="button"
                              className="playBtn"
                              onClick={() => setPlayVideo(true)}
                            >
                              <Image src="/images/playIcon.svg" width="30" height="30" alt="Play" />
                            </button>
                          </div>
                        )}
                  </div>
                )
              : selectedData?.fields?.thumbnailImage?.fields?.file?.contentType?.split('/')[0]
                === 'image'
                ? (
                    <div className="blogDetailBanner">
                      <Image
                        src={`https:${selectedData.fields.thumbnailImage.fields.file.url}`}
                        quality={100}
                        width={1000}
                        height={250}
                        alt="blog-img"
                      />
                    </div>
                  )
                : (
                    ''
                  )}
            <Breadcrumb items={breadcrumbItems} />
            {/* Blog content and TOC */}
            <div style={{display: 'flex', justifyContent: 'space-between'}} className="blog_detail_inner_content">
              {/* Blog Content */}
              <div className='custom-col'>
                <h1>{selectedData?.fields?.title}</h1>
                {/* <p>{selectedData?.fields?.description}</p> */}

                <div className="rich-text-container">
                  {content
                  && documentToReactComponents(content, {
                    renderNode: {
                      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => {
                        const textContent = getTextContent(node);
                        const id = textContent.replace(/\s+/g, '-').toLowerCase();
                        return <h2 id={id}>{children}</h2>;
                      },
                      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => {
                        const textContent = getTextContent(node);
                        const id = textContent.replace(/\s+/g, '-').toLowerCase();
                        return <h3 id={id}>{children}</h3>;
                      },

                      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
                        const assetId = node.data.target.sys.id;
                        const asset = resolvedAssets.find((item: any) => item.sys.id === assetId);

                        if (!asset) {
                          return null;
                        } // Handle missing asset gracefully

                        const { file, title } = asset.fields;
                        const contentType = file.contentType.split('/')[0];

                        // Handle images and videos based on contentType
                        if (contentType === 'image') {
                          return (
                            <img
                              src={`https:${file.url}`}
                              alt={title}
                              style={{ maxWidth: '100%', height: 'auto' }}
                              className="contentImage"
                            />
                          );
                        }

                        if (contentType === 'video') {
                          return (
                            <video controls style={{ maxWidth: '100%' }}>
                              <source src={`https:${file.url}`} type={file.contentType} />
                            </video>
                          );
                        }

                        // Fallback for unsupported types
                        return <span>Unsupported asset type</span>;
                      },
                      [BLOCKS.TABLE]: (node: any) => {
                        return (
                          <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1em 0' }}>
                            <thead>
                              {node.content
                                .filter((rowNode: any) => rowNode.nodeType === 'table-row') // Filter for table rows
                                .map((rowNode: any, rowIndex: number) => (
                                  <tr key={rowIndex}>
                                    {rowNode.content
                                      .filter((cellNode: any) => cellNode.nodeType === 'table-header-cell') // Filter for table header cells
                                      .map((headerNode: any, headerIndex: number) => (
                                        <th
                                          key={headerIndex}
                                          style={{
                                            padding: '8px',
                                            textAlign: 'left',
                                            border: '1px solid #ddd',
                                            backgroundColor: '#f4f4f4',
                                          }}
                                        >
                                          {headerNode.content.map((paragraphNode: any, paragraphIndex: number) =>
                                            paragraphNode.nodeType === 'paragraph'
                                              ? (
                                                  paragraphNode.content.map((textNode: any) =>
                                                    textNode.nodeType === 'text' ? textNode.value : null,
                                                  )
                                                )
                                              : null,
                                          )}
                                        </th>
                                      ))}
                                  </tr>
                                ))}
                            </thead>
                            <tbody>
                              {node.content
                                .filter((rowNode: any) => rowNode.nodeType === 'table-row') // Filter for table rows
                                .map((rowNode: any, rowIndex: number) => (
                                  <tr key={rowIndex}>
                                    {rowNode.content
                                      .filter((cellNode: any) => cellNode.nodeType === 'table-cell') // Filter for table body cells
                                      .map((cellNode: any, cellIndex: number) => (
                                        <td
                                          key={cellIndex}
                                          style={{
                                            padding: '8px',
                                            textAlign: 'left',
                                            color: '#fff',
                                            border: '1px solid #ddd',
                                          }}
                                        >
                                          {cellNode.content.map((paragraphNode: any, paragraphIndex: number) =>
                                            paragraphNode.nodeType === 'paragraph'
                                              ? (
                                                  paragraphNode.content.map((textNode: any) =>
                                                    textNode.nodeType === 'text' ? textNode.value : null,
                                                  )
                                                )
                                              : null,
                                          )}
                                        </td>
                                      ))}
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        );
                      },

                    },
                  })}
                </div>

                <div className="share-container">
                  <p>Like what you see? Share with a friend.</p>
                  <div className="social-links">
                    <Link
                      target="_blank"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`}
                      aria-label="Share article on Facebok"
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      target="_blank"
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}`}
                      aria-label="Share article on X.com"
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      target="_blank"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentURL)}`}
                      aria-label="Share article on Linkedin"
                    >
                      <FaLinkedin />
                    </Link>
                  </div>
                </div>
              </div>

              {/* TOC */}
              <div className='custom-col'>
                <div className="toc">
                  <h5>In this article</h5>
                  <ul>
                    {tableOfContents.map((item, index) => (
                      <li key={index}>
                        <a href={`#${item.id}`}>{item.text}</a>
                      </li>
                    ))}
                  </ul>

                </div>
                <div className="author-info">
                  <div className="author-header">
                    <Image
                      src={
                        resolvedAssets && resolvedAssets.find((item: any) => item.sys.id === resolvedAuthor?.fields?.profilePicture?.sys?.id)
                          ?.fields
                          ?.file
                          ?.url
                          ? `https:${resolvedAssets.find((item: any) => item.sys.id === resolvedAuthor?.fields?.profilePicture?.sys?.id)?.fields?.file?.url}`
                          : `https://ui-avatars.com/api/?name=${resolvedAuthor ? resolvedAuthor?.fields?.name : ''}`
                      }
                      width={100}
                      height={100}
                      alt="Author Image"
                      className="author-image"
                      quality={100}
                    />
                    <div className="author-details">
                      <h3 className="author-name">{resolvedAuthor ? resolvedAuthor?.fields?.name : ''}</h3>
                      <p className="author-title">{resolvedAuthor ? resolvedAuthor?.fields?.authorTitle : ''}</p>
                    </div>
                  </div>
                  <p className="author-description">
                    {resolvedAuthor ? resolvedAuthor?.fields?.authorIntro : ''}
                  </p>
                  <div className="author-social-links">
                    {resolvedAuthor?.fields?.socialLinks?.map((url: string, index: number) => {
                      return (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                          aria-label={`Social link to ${url}`}
                        >
                          {getIcon(url)}

                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="share-containerToc">
                  <p>Share with your community.</p>
                  <div className="social-links">
                    <Link
                      target="_blank"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`}
                      aria-label="Share article on Facebok"
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      target="_blank"
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}`}
                      aria-label="Share article on X.com"
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      target="_blank"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentURL)}`}
                      aria-label="Share article on Linkedin"
                    >
                      <FaLinkedin />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default page;
