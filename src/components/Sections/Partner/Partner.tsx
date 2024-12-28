import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import React from 'react';
import './partner.module.css';

export const Partner = () => {
  const partnerLogos = [
    '/images/partners/p_1.svg',
    '/images/partners/p_2.svg',
    '/images/partners/p_3.svg',
    '/images/partners/p_4.svg',
    '/images/partners/p_5.svg',
    '/images/partners/p_6.svg',
    '/images/partners/p_7.svg',
    '/images/partners/p_8.svg',
  ];

  return (
    <div className="partners" data-aos="fade-up" data-aos-duration="600">
      <Container className="main margins">
        <center>
          <Heading className="secondry" id="h_ani">
            Industry Partnerships and Accreditation
          </Heading>
        </center>
        <div className="partners-scroll-container">
          <div className="partners-scroll">
            {partnerLogos.map((logo, index) => (
              <div className="partners-image" key={index}>
                <img src={logo} alt={`Partner ${index + 1}`} />
              </div>
            ))}
            {partnerLogos.map((logo, index) => (
              // Duplicate for seamless scrolling
              <div className="partners-image" key={`dup-${index}`}>
                <img src={logo} alt={`Partner ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>

  );
};
