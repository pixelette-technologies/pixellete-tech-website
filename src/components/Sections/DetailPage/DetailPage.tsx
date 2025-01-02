import type { Entry } from 'contentful';
import type { ReactElement } from 'react';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
import { createClient } from 'contentful';
import { motion } from 'framer-motion';
// import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Element, Link } from 'react-scroll';
import { v4 as uuidv4 } from 'uuid';
import './detailpage.css';

type DetailsNavigateProps = {
  data: { title: string; lists?: any; description?: string }[];
  overViewIndex?: boolean;
  headerSection?: boolean;
  headingIndex?: boolean;
};

type BlogDetailFields = {
  name?: string;
  date?: string;
  content?: string;
  images?: {
    fields?: {
      file?: {
        url?: string;
      };
    };
  };
};

const DetailsNavigate: React.FC<DetailsNavigateProps> = (props): ReactElement => {
  const { data } = props;
  const [isOpenContent, setIsOpenContent] = useState<boolean>(true);
  const [isScrollDisabled, setIsScrollDisabled] = useState<boolean>(false);
  const [singleBlogDetail, setSingleBlogDetail] = useState<Entry<BlogDetailFields> | null>(null);
  const componentRef = useRef<HTMLDivElement | null>(null);
  // const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const client = createClient({
      space: 'ggtsbq0gqfii',
      accessToken: 'VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo',
    });

    const getEntryById = async () => {
      try {
        const response = await client.getEntry<BlogDetailFields>(id!);
        setSingleBlogDetail(response);
      } catch (error) {
        console.error('Error fetching blog entry:', error);
      }
    };

    getEntryById();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setIsOpenContent(window.innerWidth > 1000);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsScrollDisabled(window.innerWidth <= 1000 && isOpenContent);
  }, [isOpenContent]);

  useEffect(() => {
    document.body.style.overflowY = isScrollDisabled ? 'hidden' : 'auto';
  }, [isScrollDisabled]);

  const handleOverviewClick = () => {
    setIsOpenContent(!isOpenContent);
  };

  const handleOverviewItemClick = (title: string) => {
    if (window.innerWidth <= 1000) {
      setIsOpenContent(false);
    }
    scrollToContactUs(title);
  };

  const widthForDesktop = window.innerWidth <= 1000 ? 30 : 0;

  const extractMarkdownHeadings = (content: string) => {
    const headings: { level: number; text: string }[] = [];
    const lines = content.split('\n');

    lines.forEach((line) => {
      const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        headings.push({ level, text });
      }
    });

    return headings;
  };

  return (
    <div className="detailNavigate">
      <div>
        <button
          style={{ right: isOpenContent ? '60rem' : '30rem' }}
          onClick={handleOverviewClick}
        >
          Overview
        </button>
        <motion.div
          initial={{ x: '0rem', opacity: 0 }}
          animate={{
            x: isOpenContent
              ? `-${widthForDesktop}rem`
              : `${widthForDesktop}rem`,
            opacity: isOpenContent ? 1 : 0,
          }}
          exit={{ opacity: 0 }}
        >
          {isOpenContent && (
            <>
              <Heading className="blogCardHeading">
                Overview
              </Heading>
              {data?.map((ls, index) => {
                const { title } = ls;
                return (
                  <div
                    key={uuidv4()}
                    onClick={() => handleOverviewItemClick(title)}
                  >
                    {props.overViewIndex && (
                      <Text className="secondry">
                        {index + 1}
                        .
                      </Text>
                    )}
                    <Text className="secondry">
                      {title}
                    </Text>
                  </div>
                );
              })}
              {singleBlogDetail?.fields?.content
              && extractMarkdownHeadings(singleBlogDetail.fields.content).map(
                item => (
                  <Link
                    key={uuidv4()}
                    to="headings"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      fontSize: '15px',
                    }}
                  >
                    <ReactMarkdown>{item.text}</ReactMarkdown>
                  </Link>
                ),
              )}
            </>
          )}
        </motion.div>
      </div>

      <section>
        <div ref={componentRef}>
          {props.headerSection && (
            <header>
              {singleBlogDetail?.fields?.date && (
                <Text
                  className="titory--bold"
                  animation="fade-up"
                  duration="400"
                >
                  {singleBlogDetail.fields.date}
                </Text>
              )}
              {singleBlogDetail?.fields?.name && (
                <Heading
                  className="secondry"
                  animation="fade-up"
                  duration="500"
                >
                  {singleBlogDetail.fields.name}
                </Heading>
              )}
              {singleBlogDetail?.fields?.images?.fields?.file?.url && (
                <img
                  src={singleBlogDetail.fields.images.fields.file.url}
                  alt="Blog-Hero-Main-Image"
                  data-aos="fade-up"
                  data-aos-duration="500"
                />
              )}
            </header>
          )}
          <Element name="headings">
            {singleBlogDetail?.fields?.content && (
              <Text
                className="secondry"
                animation="fade-up"
                duration="600"
              >
                <ReactMarkdown>
                  {singleBlogDetail.fields.content}
                </ReactMarkdown>
              </Text>
            )}
          </Element>
        </div>
      </section>
    </div>
  );
};

export default DetailsNavigate;

export const scrollToContactUs = (id: string) => {
  const contactForm = document.getElementById(id);
  if (contactForm) {
    const offset = contactForm.offsetTop - 10;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }
};
