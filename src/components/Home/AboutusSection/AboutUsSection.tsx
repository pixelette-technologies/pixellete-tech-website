'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Container } from '../../Feature/Container/Container'; // Simplified import
// Simplified import
// Simplified import
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
            const endValue = Number.parseInt(element.getAttribute('data-end') || '0', 10);
            if (!counters.current[sectionId]) {
              let current = 0;
              const interval = setInterval(() => {
                if (current < endValue) {
                  current++;
                  element.innerText = `${current}${sectionId.includes('%') ? '%' : '+'}`;
                } else {
                  clearInterval(interval);
                }
              }, 10);
            }
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

  return (
    <>
      <Container className="main">
        <div className="aboutUsSection-background">
          <Image src="/images/aboutSection/aboutLeftBackground.svg" alt="background" width={100} height={100} />
          <Image src="/images/aboutSection/aboutRightBackground.svg" alt="background" width={100} height={100} />
        </div>
      </Container>
      <div className="aboutUsSection">
        <Container className="main margins">
          <section data-aos="fade-up" data-aos-duration="1000">
            <div>
              <h2>
                Our passion lies in building
                {' '}
                <br />
                {' '}
                tech solutions that drive real
                change across industries
              </h2>
              <p>
                From our beginnings in 2018, Pixelette Technologies has rapidly become a world-leading development
                services company, specializing in AI, blockchain, web, mobile technologies, and more.
              </p>
            </div>
            <div>
              {Array.from({ length: 6 }, (_, index) => (
                <section className="counter-section" id={`counter-section-${index + 1}`} key={`counter-section-${index + 1}`}>
                  <h1 data-end={index === 4 ? 97 : index === 5 ? 13 : (index + 1) * 100}>0</h1>
                  <div>
                    <p>
                      {
                        [
                          'Projects Completed',
                          'Global Team Members',
                          'Hours in Development',
                          'Happy Clients',
                          'Customer Satisfaction',
                          'Global Locations',
                        ][index]
                      }
                    </p>
                  </div>
                </section>
              ))}
            </div>
          </section>
        </Container>
        <Container className="main margins">
          <section data-aos="fade-up" data-aos-duration="1000">
            <div className="scottland-container" style={{ width: '100%' }}>
              {[...Array.from({ length: 2 })].map((_, i) => (
                <div
                  className="scottland-section"
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    gap: '2rem',
                    justifyContent: i === 1 ? 'right' : 'flex-start',
                  }}
                >
                  <div>
                    <img src={`/images/home/${i === 0 ? 'appg' : 'scotland'}.png`} alt={i === 0 ? 'APPG Logo' : 'Scotland Logo'} />
                  </div>
                  <div className="scottland-text" style={{ flex: 1 }}>
                    <p>
                      Official Secretariat of the British Government’s AI policy body (APPG AI)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};

export default AboutUsSection;
