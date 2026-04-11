'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Container } from '../../Feature/Container/Container';
import './aboutussection.css';

type VisibleSections = {
  [key: string]: boolean;
};

const AboutUsSection: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<VisibleSections>({});
  const counters = useRef<{ [key: string]: number }>({
    'counter-section-1': 0,
    'counter-section-2': 0,
    'counter-section-3': 0,
    'counter-section-4': 0,
    'counter-section-5': 0,
    'counter-section-6': 0,
  });

  // useEffect(() => {
  //   const options: IntersectionObserverInit = {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 0.5,
  //   };

  //   const handleIntersect: IntersectionObserverCallback = (entries) => {
  //     entries.forEach((entry) => {
  //       const sectionId = entry.target.id;
  //       if (visibleSections[sectionId]) {
  //         return;
  //       }

  //       const isIntersecting = entry.isIntersecting;
  //       setVisibleSections(prev => ({
  //         ...prev,
  //         [sectionId]: isIntersecting,
  //       }));

  //       if (isIntersecting) {
  //         const element = entry.target.querySelector<HTMLHeadingElement>('h1');
  //         if (element) {
  //           const targetValue = element.getAttribute('data-end') || '0';

  //           // Directly set non-numeric values (e.g., 'Top 30', '£100M+')
  //           if (isNaN(Number(targetValue.replace(/\D/g, '')))) {
  //             element.innerText = targetValue; // Set non-numeric values directly
  //           } else {
  //             const numericValue = Number.parseInt(targetValue.replace(/\D/g, ''), 10); // Extract numeric part
  //             const suffix = targetValue.replace(/\d/g, ''); // Extract suffix (e.g., '+', '%', 'M', etc.)

  //             let current = 0;
  //             const interval = setInterval(() => {
  //               if (current < numericValue) {
  //                 current += Math.ceil(numericValue / 100); // Increment value dynamically
  //                 element.innerText = `${Math.min(current, numericValue)}${suffix}`;
  //               } else {
  //                 clearInterval(interval);
  //                 element.innerText = `${numericValue}${suffix}`; // Ensure final formatting
  //               }
  //             }, 10);
  //           }
  //         }
  //       }
  //     });
  //   };

  //   const observer = new IntersectionObserver(handleIntersect, options);
  //   const targets = document.querySelectorAll('.counter-section');
  //   targets.forEach(target => observer.observe(target));

  //   return () => {
  //     targets.forEach(target => observer.unobserve(target));
  //   };
  // }, [visibleSections]);
  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;

        if (visibleSections[sectionId]) {
          return;
        }

        const isIntersecting = entry.isIntersecting;
        setVisibleSections(prev => ({
          ...prev,
          [sectionId]: isIntersecting,
        }));

        if (isIntersecting) {
          const element = entry.target.querySelector<HTMLHeadingElement>('h1');
          if (element) {
            const prefix = element.getAttribute('data-prefix') || '';
            const midfix = element.getAttribute('data-midfix') || '';
            const suffix = element.getAttribute('data-suffix') || '';
            const numericValue = Number.parseFloat(element.getAttribute('data-end') || '0');

            let current = 0;
            const increment = numericValue < 10 ? 0.1 : Math.ceil(numericValue / 50); // Small increments for decimals

            const interval = setInterval(() => {
              current = Math.min(current + increment, numericValue); // Increment value
              element.innerText = `${prefix}${current.toFixed(numericValue < 10 ? 1 : 0)}${midfix}${suffix}`; // Proper decimal formatting

              if (current >= numericValue) {
                clearInterval(interval);
                element.innerText = `${prefix}${numericValue}${midfix}${suffix}`; // Final value
              }
            }, 10);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    const targets = document.querySelectorAll('.counter-section');
    targets.forEach(target => observer.observe(target));

    return () => {
      targets.forEach(target => observer.unobserve(target));
    };
  }, [visibleSections]);

  const isoText = 'ISO 9001:2015 certified';

  return (
    <>
      {/* <Container className="main">
        {/* <div className="aboutUsSection-background">
          <Image src="/images/aboutSection/aboutLeftBackground.svg" alt="background" width={100} height={100} />
          <Image src="/images/aboutSection/aboutRightBackground.svg" alt="background" width={100} height={100} />
        </div>
      </Container> */}
      <div className="aboutUsSection" id="sideMargin">
        <Container className="main margins">
          <section // data-aos="fade-up" data-aos-duration="1000"
          >
            <div>
              <h2 className="sm-text-center">
                Our passion lies in engineering technologies that redefine industries
              </h2>
              <p className="sm-text-center">
                Since 2018, Pixelette Technologies has evolved from a pioneering blockchain studio into a enterprise technology group, leading breakthroughs across AI, agentic systems, quantum computing, and decentralised technologies.
                <br />
                Our mission is simple, to turn bold ideas into secure, ISO 27001-certified, and production-ready systems.
              </p>
            </div>
            <div>
              {[
                { end: 97, prefix: '', midfix: '', suffix: '%' },
                { end: 4.8, prefix: '', midfix: '', suffix: '' },
                { end: 30000, prefix: '', midfix: '', suffix: '+' },
                { end: 200, prefix: '', midfix: '', suffix: '+' },
                // { end: 100, prefix: '£', midfix: '', suffix: 'M+' },
                { end: 30, prefix: 'Top ', midfix: '', suffix: '' },
              ].map((value, index) => {
                const isLastItem = index === 4;
                return (
                  <section
                    className={`counter-section ${isLastItem ? 'counter-section-last' : ''}`}
                    id={`counter-section-${index + 1}`}
                    key={`counter-section-${index + 1}`}
                  >
                    <h1
                      data-end={value.end}
                      data-prefix={value.prefix}
                      data-midfix={value.midfix}
                      data-suffix={value.suffix}
                    >
                      {`${value.prefix}${value.end}${value.midfix}${value.suffix}`}
                    </h1>
                    <div>
                      <p>
                        {
                          [
                            'customer satisfaction rating',
                            'overall Clutch rating',
                            'hours in development across diverse industries',
                            'team members across 13 countries, with 15+ locations and expanding',
                            // ' in funding secured for client startups',
                            'globally among the software development companies (Clutch)',
                          ][index]
                        }
                      </p>
                    </div>
                  </section>
                );
              })}

            </div>
          </section>
        </Container>

        <div className="certificate-banner">
          <Container className="main margins">
            <div className="certificate-banner-content">
              {/* APPG Section */}
              <div className="certificate-item">
                <div className="certificate-logos">
                  <img
                    src="/images/home/appg.png"
                    alt="APPG Logo"
                    className="certificate-logo"
                  />
                </div>
                <p className="certificate-text">
                  Official Secretariat of the British Government's AI policy body (APPG AI)
                </p>
              </div>

              {/* ISO Section */}
              <Link
                href="https://www.iafcertsearch.org/certification/YO4M06B7qmkr3O8ftofk68ck"
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-item certificate-item-link"
              >
                <div className="certificate-logos">
                  <img
                    src="/images/home/IsoCertificate.svg"
                    alt="ISO Certificate"
                    className="certificate-logo iso-logo"
                  />
                </div>
                <p className="certificate-text">
                  ISO 9001:2015 certified
                </p>
              </Link>

              {/* ISO 27001 Section */}
              <div className="certificate-item">
                <div className="certificate-logos">
                  <img
                    src="/images/home/Iso27001.png"
                    alt="ISO 27001:2022 Certified Company"
                    className="certificate-logo iso-logo"
                  />
                </div>
                <p className="certificate-text">
                  ISO 27001:2022 certified
                </p>
              </div>

              {/* Scotland Section */}
              <div className="certificate-item">
                <div className="certificate-logos">
                  <img
                    src="/images/home/Scotland.png"
                    alt="Scotland Logo"
                    className="certificate-logo"
                  />
                </div>
                <p className="certificate-text">
                  Awarded 'Best AI Agency UK' three times by the Scotland Business Awards
                </p>
              </div>
            </div>
          </Container>
        </div>

      </div>
    </>
  );
};

export default AboutUsSection;
