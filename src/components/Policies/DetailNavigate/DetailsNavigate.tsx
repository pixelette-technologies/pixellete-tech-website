'use client';
import Text from '@/components/Feature/Text/Text';
import { createClient } from 'contentful';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './index.css';

const DetailsNavigate = (props) => {
  const data = props.data;
  const [isOpenContent, setIsOpenContent] = useState(true);
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);
  const componentRef = useRef();

  const [singleBlogDetail, setSingleBlogDetail] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const client = createClient({
      space: 'ggtsbq0gqfii',
      accessToken: 'VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo',
    });
    const getEntryById = async () => {
      try {
        client.getEntry(id).then((response) => {
          console.log('responseee: ', response);
          setSingleBlogDetail(response);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getEntryById();
  }, []);
  console.log('Hello :', singleBlogDetail);

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
    if (isScrollDisabled) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isScrollDisabled]);

  const handleOverviewClick = () => {
    setIsOpenContent(!isOpenContent);
  };

  const handleOverviewItemClick = (title) => {
    window.innerWidth <= 1000 && setIsOpenContent(false);
    scrollToContactUs(title);
  };

  const widthForDesktop = window.innerWidth <= 1000 ? 30 : 0;

  const extractMarkdownHeadings = (content) => {
    const headings = [];
    const lines = content.split('\n');

    lines.forEach((line) => {
      const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        headings.push({ level, text });
      }
    });
    console.log(headings);

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
              <h3 className="blogCardHeading">
                Overview
              </h3>
              {data?.map((ls, index) => {
                const { title } = ls;
                return (
                  <>
                    {title && (
                      <div
                        key={index}
                        onClick={() => handleOverviewItemClick(title)}
                      >
                        {props.overViewIndex && (
                          <div>
                            <p>
                              {index + 1}.
                              </p>
                          </div>
                        )}
                        <p>
                          {title}
                          </p>
                      </div>
                    )}
                  </>
                );
              })}
              {singleBlogDetail.fields?.content && (
                extractMarkdownHeadings(singleBlogDetail.fields?.content)
                  .map(item => (
                    <Link href="headings" style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
                      <ReactMarkdown>
                        {item.text}
                      </ReactMarkdown>
                    </Link>
                  ))
              )}
            </>
          )}
        </motion.div>
      </div>

      <section>
        <div ref={componentRef}>
          {props.headerSection && (
            <header>
              {singleBlogDetail.fields?.date && (
                
                 <p>
                  {singleBlogDetail.fields?.date}
                  </p>
                
              )}
              {singleBlogDetail.fields?.name && (
                <h1
                >
                  {singleBlogDetail.fields?.name}
                </h1>
              )}
              {singleBlogDetail.fields?.images?.fields?.file?.url && (
                <img
                  src={singleBlogDetail.fields?.images?.fields?.file?.url}
                  alt="Blog-Hero-Main-Image"
                  data-aos="fade-up"
                  data-aos-duration="500"
                />
              )}
            </header>
          )}
          {/* <Element name="headings"> */}
          {singleBlogDetail.fields?.content && (
            
             <p>
              <ReactMarkdown>
                {singleBlogDetail.fields?.content}
              </ReactMarkdown>
              </p>
          )}
          {/* </Element> */}
          {data?.map((ls, index) => {
            const { title, lists, description } = ls;
            return (
              <div id={title} key={index}>
                {title && (
                  <header>
                    <h3
                      className="policyHeading"
                    >
                      {props.headingIndex && index + 1 + "."} {title}
                    </h3>
                  </header>
                )}

                {title === "Contact" && (
                  <blockquote>
                    <div data-aos="fade-up" data-aos-duration={`500`}>
                      <img src="/images/about/mail.svg" alt="icon" />
                      <p>
                        sales@pixelettetech.com
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration={`500`}>
                      <img src="/images/about/mapIcon.svg" alt="icon" />
                      <p>
                        https://www.pixelettetech.com/contact-us/
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration={`500`}>
                      <img src="/images/about/phone.svg" alt="icon" />
                      <p>
                        +44 2045188226
                        </p>
                    </div>
                  </blockquote>
                )}

              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DetailsNavigate;

export const scrollToContactUs = (id) => {
  const contactForm = document.getElementById(id);
  if (contactForm) {
    const offset = contactForm.offsetTop - 10;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }
};
