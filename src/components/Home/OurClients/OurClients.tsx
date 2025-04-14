import { Container } from '@/components/Feature/Container/Container'; // Import your custom Container component
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';
import './ourclients.css';
// Import your custom Text component

type OurClientsProps = object;

const Marqueee: React.FC = () => {
  const images = [
    // '/images/trustedclients/ec_1.svg',
    // '/images/trustedclients/ec_2.svg',
    // '/images/trustedclients/ec_3.svg',
    // '/images/trustedclients/ec_4.svg',
    // '/images/trustedclients/ec_5.svg',
    // '/images/trustedclients/ec_6.svg',
    // '/images/trustedclients/ec_7.svg',
    '/images/trustedclients/t1.png',
    '/images/trustedclients/t2.png',
    '/images/trustedclients/t3.png',
    '/images/trustedclients/t4.png',
    '/images/trustedclients/t5.png',
    '/images/trustedclients/t6.png',
    '/images/trustedclients/t7.png',
    '/images/trustedclients/t8.png',
    '/images/trustedclients/t9.png',
    // '/images/trustedclients/ec_8.svg',
  ];
  return (
    // <div className="marquee-container">
    <Marquee className="marquee-container" speed={50}>
      {/* Add your images or content here */}
      <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: '2rem' }}>
        {images.concat(images).map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`icon ${index}`}
            style={{ flex: '0 0 auto' }}
            loading="lazy"
            height={50}
            width={150}
          />
        ))}
      </div>
    </Marquee>
    // </div>
  );
};

export const OurClients: React.FC<OurClientsProps> = () => {
  return (
    <div className="ourClients">
      <Container className="main">
        <center>
          <h2 id="h_ani">
            Trusted by leading innovators
          </h2>
        </center>
        <div // data-aos="fade-up" data-aos-duration="500"
        >
          <Marqueee />
        </div>
      </Container>
    </div>
  );
};
