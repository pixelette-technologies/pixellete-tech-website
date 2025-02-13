import Image from 'next/image';
import React from 'react';
import { Container } from '../Feature/Container/Container';
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
        <div className="privacyPolicy" style={{ padding: '10rem 0' }}>
          <center>
            <h1
              className="heroHeading"
            >
              Privacy Policy
            </h1>

            <p>
              Pixelette Technologies is committed to protecting your personal
              information and respecting your privacy. This Privacy Policy
              explains how we collect, use, store, and share your personal
              information when you visit our website or use our services. This
              policy is compliant with the General Data Protection Regulation
              (GDPR) of the European Union and the Data Protection Act 2018 of
              the United Kingdom.
            </p>

          </center>
        </div>
      </Container>
      <EvaluateBusiness
        heading="Ready to become a tech success story?"
        description="Don’t let technical hurdles stand in the way of building powerful tech solutions. Let us help you bring your vision to life with innovative, cost-effective and reliable services. Get in touch!"
      />
    </>
  );
};

export default PrivacyPolicy;
