import { Container } from '@/components/Feature/Container/Container';
import Text from '@/components/Feature/Text/Text';
import React from 'react';
import { ContactUsForm } from '../contactUsForm/ContactUsForm';
import './evaluatebusiness.css';

export const EvaluateBusiness: React.FC = () => {
  return (
    <Container className="main margins">
      <div className="evaluateBussiness">
        <header>
          <h1>
            Elevate Your Business Today
          </h1>
          <p>
            Complete the form to collaborate with our specialists and develop a
            customised solution that brings your vision alive.
            </p>
          
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
