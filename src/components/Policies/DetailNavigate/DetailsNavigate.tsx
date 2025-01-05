'use client';
import { Heading } from '@/components/Feature/Heading/Heading';
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
              <Heading className="blogCardHeading">
                Overview
              </Heading>
              {/* {data?.map((ls, index) => {
                const { title } = ls;
                return (
                  <>
                    {title && (
                      <div
                        key={uuidv4()}
                        onClick={() => handleOverviewItemClick(title)}
                      >
                        {props.overViewIndex && (
                          <div>
                            <Text className="secondry">
                              {index + 1}.
                            </Text>
                          </div>
                        )}
                        <Text className="secondry">
                          {title}
                        </Text>
                      </div>
                    )}
                  </>
                );
              })} */}
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
                <Text
                  className="titory--bold"
                  animation="fade-up"
                  duration="400"
                >
                  {singleBlogDetail.fields?.date}
                </Text>
              )}
              {singleBlogDetail.fields?.name && (
                <Heading
                  className="secondry"
                  animation="fade-up"
                  duration="500"
                >
                  {singleBlogDetail.fields?.name}
                </Heading>
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
            <Text
              className="secondry"
              animation="fade-up"
              duration="600"
            >
              <ReactMarkdown>
                {singleBlogDetail.fields?.content}
              </ReactMarkdown>
            </Text>
          )}
          {/* </Element> */}
          {/* {data?.map((ls, index) => {
            const { title, lists, description } = ls;

            return (
              <div id={title} key={uuidv4()}>
                {title && (
                  <header>
                    <Heading
                      className="policyHeading"
                      animation="fade-up"
                      duration="400"
                    >
                      {props.headingIndex && index + 1 + "."} {title}
                    </Heading>
                  </header>
                )}

                {title === "Contact" && (
                  <blockquote>
                    <div data-aos="fade-up" data-aos-duration={`500`}>
                      <img src="/images/about/mail.svg" alt="icon" />
                      <Text className="secondry">
                        sales@pixelettetech.com
                      </Text>
                    </div>
                    <div data-aos="fade-up" data-aos-duration={`500`}>
                      <img src="/images/about/mapIcon.svg" alt="icon" />
                      <Text className="secondry">
                        https://www.pixelettetech.com/contact-us/
                      </Text>
                    </div>
                    <div data-aos="fade-up" data-aos-duration={`500`}>
                      <img src="/images/about/phone.svg" alt="icon" />
                      <Text className="secondry">
                        +44 2045188226
                      </Text>
                    </div>
                  </blockquote>
                )}

              </div>
            );
          })} */}
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
