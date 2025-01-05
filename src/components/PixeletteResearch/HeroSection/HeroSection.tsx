'use client';
import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
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
          <Heading
            className="heroHeading"
            animation="zoom-out"
            duration="500"
          >
            Pixelette Research
          </Heading>
          <Text
            className="secondry"
            animation="zoom-in"
            duration="600"
          >
            Pixelette Research empowers the realm of emerging tech through
            pioneering research and cutting-edge innovation. Our team of experts
            pushes the boundaries, driving transformative solutions that shape
            the future and revolutionise industries.
          </Text>
        </center>

        {/* Main Content */}
        <Container className="main margins">
          <div className="content">
            {/* Globe Section */}
            <div className="globe-container">
              <GlobeWorld  />
            </div>

            {/* Description Section */}
            <div className="description">
              <section>
                <Heading
                  className="secondry"
                  animation="fade-up"
                  duration="500"
                >
                  About Pixelette Research
                </Heading>
                <Text
                  className="titory--bold"
                  animation="fade-up"
                  duration="600"
                >
                  Welcome to Pixelette Research, a dynamic research arm driving
                  growth and transformation across industries.
                </Text>
                <Text
                  className="titory--bold"
                  animation="fade-up"
                  duration="700"
                >
                  With a focus on areas such as artificial intelligence, machine
                  learning, data science, blockchain, and more, our services
                  encompass comprehensive research projects, insightful data
                  analysis, predictive modeling, and tailored strategies.
                  Additionally, we offer cutting-edge solutions in areas like
                  robotic process automation (RPA), natural language processing
                  (NLP), and decentralised finance (DeFi), enabling our clients
                  to stay ahead in the fast-paced digital landscape.
                </Text>
                <Text
                  className="titory--bold"
                  animation="fade-up"
                  duration="700"
                >
                  At Pixelette Research, we are dedicated to pushing the
                  boundaries and empowering organisations to thrive in the
                  digital age. Explore our comprehensive range of services and
                  embark on a transformative journey with Pixelette Research
                  today.
                </Text>
              </section>
            </div>
          </div>

          {/* Featured Whitepapers */}
          <section>
            <Heading
              className="secondry"
              animation="fade-up"
              duration="2500"
            >
              Featured Whitepapers
            </Heading>

            <div data-aos="fade-up" data-aos-duration="2500">
              <div>
                <Text className="primary--bold">
                  Unlocking the Power of
                  {' '}
                  <br />
                  Machine Learning
                </Text>
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
