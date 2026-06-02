'use client';
import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { FiDownload } from 'react-icons/fi';

// import { World } from '../Globe/World';
import './herosection.css';

const GlobeWorld = dynamic(() => import('../Globe/World').then(mod => mod.default), {
  ssr: false, // Ensure it's client-side only
});

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Background Container */}
      <Container className="main">
        <div className="heroSectionResearch-background">
          <Image
            src="/images/pixelettechResearch/heroSectionBackground.svg"
            alt="Research Background"
            layout="responsive"
            width={1920} // Replace with actual dimensions
            height={1080}
          />
        </div>
      </Container>

      {/* Hero Section */}
      <div className="heroSectionResearch">
        <center>
          <h1
            className="heroHeading"
          >
            Pixelette Research
          </h1>

          <p>
            Pixelette Research empowers the realm of emerging tech through
            pioneering research and cutting-edge innovation. Our team of experts
            pushes the boundaries, driving transformative solutions that shape
            the future and revolutionise industries.
          </p>

        </center>

        {/* Main Content */}
        <Container className="main margins">
          <div className="content" id="sideMargin">
            {/* Globe Section */}
            <div className="globe-container">
              <GlobeWorld />
            </div>

            {/* Description Section */}
            <div className="description">
              <section>
                <h2 className="display-h1">
                  About Pixelette Research
                </h2>
                <p>
                  Welcome to Pixelette Research, a dynamic research arm driving
                  growth and transformation across industries.
                </p>
                <p>
                  With a focus on areas such as artificial intelligence, machine
                  learning, data science, blockchain, and more, our services
                  encompass comprehensive research projects, insightful data
                  analysis, predictive modeling, and tailored strategies.
                  Additionally, we offer cutting-edge solutions in areas like
                  robotic process automation (RPA), natural language processing
                  (NLP), and decentralised finance (DeFi), enabling our clients
                  to stay ahead in the fast-paced digital landscape.
                </p>
                <p>
                  At Pixelette Research, we are dedicated to pushing the
                  boundaries and empowering organisations to thrive in the
                  digital age. Explore our comprehensive range of services and
                  embark on a transformative journey with Pixelette Research
                  today.
                </p>
              </section>
            </div>
          </div>

          {/* Featured Whitepapers */}
          <section id="sideMargin">
            <h2 className="display-h1">
              Featured Whitepapers
            </h2>

            <div data-aos="fade-up" data-aos-duration="2500">
              <div>
                <p>
                  Unlocking the Power of
                  {' '}
                  <br />
                  Machine Learning
                </p>
                <Link
                  href="https://drive.google.com/file/d/1eZkyxHc8SuLETYRSO6vkK4nc71fGqIlc/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="primary">
                    <FiDownload />
                    &nbsp; Download
                  </Button>
                </Link>
              </div>
              <Image
                src="/images/pixelettechResearch/resourceGroup.svg"
                alt="Resource Group"
                width={500} // Replace with actual dimensions
                height={300}
                layout="intrinsic"
              />
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};

export default HeroSection;
