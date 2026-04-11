import { Container } from '@/components/Feature/Container/Container'; // Import your custom Container component
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';
import './ourclients.css';
// Import your custom Text component

type OurClientsProps = object;

const clientLogos = [
  { src: '/images/trustedclients/t1.png', alt: 'Client logo' },
  { src: '/images/trustedclients/t2.png', alt: 'Client logo' },
  { src: '/images/trustedclients/t3.png', alt: 'Client logo' },
  { src: '/images/trustedclients/t4.png', alt: 'Client logo' },
  { src: '/images/trustedclients/t5.png', alt: 'Client logo' },
  { src: '/images/trustedclients/t6.png', alt: 'Client logo' },
  { src: '/images/trustedclients/t7.png', alt: 'Client logo' },
  { src: '/images/trustedclients/t8.png', alt: 'Client logo' },
  { src: '/images/trustedclients/t9.png', alt: 'Client logo' },
];

const Marqueee: React.FC = () => {
  return (
    <Marquee className="marquee-container" speed={50} aria-label="Trusted client logos">
      <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: '2rem' }}>
        {clientLogos.concat(clientLogos).map((logo, index) => (
          <Image
            key={index}
            src={logo.src}
            alt={logo.alt}
            role="img"
            style={{ flex: '0 0 auto' }}
            loading="lazy"
            height={50}
            width={150}
          />
        ))}
      </div>
    </Marquee>
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
          <p>We collaborate with forward-thinking enterprises, startups, and public sector programs worldwide.</p>
        </center>
        <div // data-aos="fade-up" data-aos-duration="500"
        >
          <Marqueee />
        </div>
        <center> 
        <p>Supporting industries from healthcare to tourism, and innovation programs across the globe.</p>
        </center>
      </Container>
    </div>
  );
};
