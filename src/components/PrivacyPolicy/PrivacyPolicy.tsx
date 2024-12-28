import Image from 'next/image';
import React from 'react';
import { Container } from '../Feature/Container/Container';
import { Heading } from '../Feature/Heading/Heading';
import Text from '../Feature/Text/Text';
import { EvaluateBusiness } from '../Sections/EvaluateBusiness/EvaluateBusiness';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Container className="main">
        <div className="privacyPolicy-background">
          <Image
            src="/assets/policies.privacyPoliciesBackGround"
            alt="background"
            width={100}
            height={100}
          />
        </div>
      </Container>
      <Container className="main margins">
        <div className="privacyPolicy">
          <center>
            <Heading
              className="heroHeading"
              animation="zoom-out"
              duration="2000"
            >
              Privacy Policy
            </Heading>
            <Text
              className="secondry"
              animation="zoom-in"
              duration="2200"
            >
              Pixelette Technologies is committed to protecting your personal
              information and respecting your privacy. This Privacy Policy
              explains how we collect, use, store, and share your personal
              information when you visit our website or use our services. This
              policy is compliant with the General Data Protection Regulation
              (GDPR) of the European Union and the Data Protection Act 2018 of
              the United Kingdom.
            </Text>
          </center>
        </div>
      </Container>
      <EvaluateBusiness />
    </>
  );
};

export default PrivacyPolicy;
