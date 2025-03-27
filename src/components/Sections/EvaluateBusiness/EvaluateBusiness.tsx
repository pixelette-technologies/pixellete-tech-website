import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import React from 'react';
import { ContactUsForm } from '../contactUsForm/ContactUsForm';
import './evaluatebusiness.css';

type ClutchLogo = {
  src: string;
  alt: string;
};

type EvaluateBusinessProps = {
  heading: string;
  description: string;
  clutchLogos?: ClutchLogo[];
};

export const EvaluateBusiness: React.FC<EvaluateBusinessProps> = ({ 
  heading, 
  description,
  clutchLogos 
}) => {
  return (
    <Container className="main margins">
      <div className="evaluateBussiness" id="sideMargin">
        <div className="leftSection">
          <header>
            <h2>{heading}</h2>
            <p>{description}</p>
          </header>
          {clutchLogos && clutchLogos.length > 0 && (
            <div className="clutchLogos">
              {clutchLogos.map((logo, index) => (
                <Image
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="clutchLogo"
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <ContactUsForm
            header
            backgrounds
            insideHeading="Book a Discovery Session"
          />
        </div>
      </div>
    </Container>
  );
};
