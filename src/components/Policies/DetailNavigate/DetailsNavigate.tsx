'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import './index.css';

const DetailsNavigate = (props) => {
  const data = props.data;
  const [isOpenContent, setIsOpenContent] = useState(true);
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsOpenContent(window.innerWidth > 1000);
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsScrollDisabled(window.innerWidth <= 1000 && isOpenContent);
    }
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
    if (typeof window !== 'undefined' && window.innerWidth <= 1000) {
      setIsOpenContent(false);
    }
    scrollToContactUs(title);
  };

  const widthForDesktop
    = typeof window !== 'undefined' && window.innerWidth <= 1000 ? 30 : 0;

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
                              {index + 1}
                              .
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
            </>
          )}
        </motion.div>
      </div>

      <section>
        <div ref={componentRef}>
          {/* <Element name="headings"> */}
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
                      {props.headingIndex && `${index + 1}.`}
                      {' '}
                      {title}
                    </h3>
                    <p>
                      {description}
                      {' '}
                      abvd
                    </p>
                  </header>

                )}

                {title === 'Contact' && (
                  <blockquote>
                    <div data-aos="fade-up" data-aos-duration="500">
                      <img src="/images/about/mail.svg" alt="icon" />
                      <p>
                        sales@pixelettetech.com
                      </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="500">
                      <img src="/images/about/mapIcon.svg" alt="icon" />
                      <p>
                        https://www.pixelettetech.com/contact-us/
                      </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="500">
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
  if (typeof window !== 'undefined') {
    const contactForm = document.getElementById(id);
    if (contactForm) {
      const offset = contactForm.offsetTop - 10;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }
};
