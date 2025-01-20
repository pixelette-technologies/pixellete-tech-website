import { Container } from '@/components/Feature/Container/Container'; // Import your custom Container component
import React from 'react';
import Marquee from 'react-fast-marquee';
import './ourclients.css';
// Import your custom Text component

type OurClientsProps = object;

const Marqueee: React.FC = () => {
  const images = [
    '/images/trustedclients/ec_1.svg',
    '/images/trustedclients/ec_2.svg',
    '/images/trustedclients/ec_3.svg',
    '/images/trustedclients/ec_4.svg',
    '/images/trustedclients/ec_5.svg',
    '/images/trustedclients/ec_6.svg',
    '/images/trustedclients/ec_7.svg',
    // '/images/trustedclients/ec_8.svg',
  ];
  return (
    // <div className="marquee-container">
    <Marquee className="marquee-container" speed={60}>
      {/* Add your images or content here */}
      {/* <Image src="/images/trustedclients/ec_1.svg" alt="icon 1" width={100} height={62} />
        <Image src="/images/trustedclients/ec_2.svg" alt="icon 2" width={100} height={62} />
        <Image src="/images/trustedclients/ec_3.svg" alt="icon 3" width={100} height={62} />
        <Image src="/images/trustedclients/ec_4.svg" alt="icon 4" width={100} height={62} />
        <Image src="/images/trustedclients/ec_5.svg" alt="icon 5" width={100} height={62} />
        <Image src="/images/trustedclients/ec_6.svg" alt="icon 6" width={100} height={62} />
        <Image src="/images/trustedclients/ec_7.svg" alt="icon 7" width={100} height={62} />
        <Image src="/images/trustedclients/ec_8.webp" alt="icon 8" width={100} height={62} /> */}
      <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: '2rem' }}>
        {images.concat(images).map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`icon ${index}`}
            style={{ flex: '0 0 auto' }}
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
            Trusted By Leading Innovators
          </h2>
        </center>
        <div data-aos="fade-up" data-aos-duration="500">
          <Marqueee />
        </div>
      </Container>
    </div>
  );
};
