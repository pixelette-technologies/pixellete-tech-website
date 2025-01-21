import { Container } from '@/components/Feature/Container/Container';
import React from 'react';
import { ContactUsForm } from '../contactUsForm/ContactUsForm';
import './evaluatebusiness.css';

type EvaluateBusinessProps = {
  heading: string;
  description: string;
};

export const EvaluateBusiness: React.FC<EvaluateBusinessProps> = ({ heading, description }) => {
  return (
    <Container className="main margins">
      <div className="evaluateBussiness" id="sideMargin">
        <header>
          <h2>{heading}</h2>
          <p>{description}</p>
        </header>
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
