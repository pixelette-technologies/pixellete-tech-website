'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { Button } from '../../Feature/Button/Button'; // Simplified import
import { Container } from '../../Feature/Container/Container'; // Simplified import
import { Heading } from '../../Feature/Heading/Heading'; // Simplified import
import { Text } from '../../Feature/Text/Text'; // Simplified import
import './aboutussection.css';

const AboutUsSection = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const counters = useRef({
    'counter-section-1': 0,
    'counter-section-2': 0,
    'counter-section-3': 0,
    'counter-section-4': 0,
    'counter-section-5': 0,
    'counter-section-6': 0,
  });

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersect = (entries) => {
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

        // Trigger counting effect when section is in view
        if (isIntersecting) {
          const element = entry.target.querySelector('h1');
          if (element) {
            const endValue = Number.parseInt(element.getAttribute('data-end'), 10);
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
              <Heading className="secondry">Our passion lies in building <br /> tech solutions that drive real
              change across industries</Heading>
              <Text className="secondry">
              From our beginnings in 2018, Pixelette Technologies has rapidly
                become a world leading development services company,
                specializing in AI, blockchain, web, mobile technologies, and
                more.
              </Text>
            </div>
            <div>
              <section className="counter-section" id="counter-section-1">
                <h1 data-end="200">0</h1>
                <div>
                  <p>Projects Completed</p>
                </div>
              </section>
              <div className="counter-section" id="counter-section-2">
                <h1 data-end="210">0</h1>
                <div>
                  <p>Global Team Members</p>
                </div>
              </div>
              <section className="counter-section" id="counter-section-3">
                <h1 data-end="30">0</h1>
                <div>
                  <p>Hours in Development</p>
                </div>
              </section>
              <div className="counter-section" id="counter-section-4">
                <h1 data-end="100">0</h1>
                <div>
                  <p>Happy Clients</p>
                </div>
              </div>
              <section className="counter-section" id="counter-section-5">
                <h1 data-end="97">0</h1>
                <div>
                  <p>Customer Satisfaction</p>
                </div>
              </section>
              <div className="counter-section" id="counter-section-6">
                <h1 data-end="13">0</h1>
                <div>
                  <p>Global Locations</p>
                </div>
              </div>
            </div>
          </section>
        </Container>
      <Container className="main margins">
          <section data-aos="fade-up" data-aos-duration="1000">
            <div
              className="scottland-container"
              style={{
                width: "100%",
              }}
            >
              {/* First Section */}
              <div
                className="scottland-section"
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "2rem",
                }}
              >
                <div>
                  <img
                    src='/images/home/appg.png'
                    alt="APPG Logo"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="scottland-text" style={{ flex: 1 }}>
                  <Text className="titory--bold">
                    Official Secretariat of the British Government’s AI policy
                    body (APPG AI)
                  </Text>
                </div>
              </div>

              {/* Second Section */}
              <div
                className="scottland-section"
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "2rem",
                  justifyContent: "right",
                }}
              >
                <div>
                  <img
                    src='/images/home/scotland.png'
                    alt="Scotland Logo"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="scottland-text" style={{ flex: 1 }}>
                  <Text className="titory--bold">
                    Official Secretariat of the British Government’s AI policy
                    body (APPG AI)
                  </Text>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};

export default AboutUsSection;
