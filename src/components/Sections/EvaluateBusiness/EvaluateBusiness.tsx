import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
import React from 'react';
import { ContactUsForm } from '../contactUsForm/ContactUsForm';
import './evaluatebusiness.css';

export const EvaluateBusiness: React.FC = () => {
  return (
    <Container className="main margins">
      <div className="evaluateBussiness">
        <header>
          <Heading className="secondry">
            Elevate Your Business Today
          </Heading>
          <Text
            className="secondry"
            animation="fade-up"
            duration="700"
          >
            Complete the form to collaborate with our specialists and develop a
            customised solution that brings your vision alive.
          </Text>
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
