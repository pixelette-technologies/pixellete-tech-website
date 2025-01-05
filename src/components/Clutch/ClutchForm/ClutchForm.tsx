'use client';

import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
import { ContactUsForm } from '@/components/Sections/contactUsForm/ContactUsForm';
import { TypeAnimation } from 'react-type-animation';

import './clutchform.css';

const ClutchForm: React.FC = () => {
  return (
    <Container className="main margins">
      <div className="evaluateBussiness">
        <header>
          <Heading
            className="secondry"
          >
            We&apos;ll bring your
            <br />
            <TypeAnimation
              className="red-color"
              sequence={[
                'WEB3',
                2500, // Wait 2.5 seconds before transitioning
                'AI',
                2500,
                'APP',
                2500,
              ]}
              wrapper="span"
              deletionSpeed={20}
              speed={20}
              style={{ display: 'inline-block' }}
              repeat={Infinity}
            />
            idea to life or you
            <br />
            get your money back
          </Heading>
          <Text className="secondry" animation="fade-up" duration="700">
            Pixelette Technologies empowers non-technical founders to get
            software solutions to their exact requirements without hiring
            expensive in-house teams
            <br />
            <br />
            <ul className="custom-list">
              <li>
                Get on a call to chat about your project scope, or we&apos;ll
                make it up as we go
              </li>
              <li>
                Focus on your vision while we handle the technical details
              </li>
              <li>
                Stay in the loop to provide feedback for a platform your users
                will love
              </li>
              <li>
                Receive your completed project ahead of schedule and go to
                market
              </li>
            </ul>
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

export default ClutchForm;
