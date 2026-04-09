'use client';

import { Container } from '@/components/Feature/Container/Container';
import { ContactUsForm } from '@/components/Sections/contactUsForm/ContactUsForm';
import { TypeAnimation } from 'react-type-animation';

import './clutchform.css';

const ClutchForm: React.FC = () => {
  return (
    <Container className="main margins">
      <div className="evaluateBussinessClutch" id="sideMargin" style={{ margin: '-7rem 0' }}>
        <header>
          <h1>
            We&apos;ll bring your&nbsp;
            <TypeAnimation
              className="red-color"
              sequence={[
                'WEB3',
                2500,
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
            <br />
            idea to life or you
            <br />
            get your money back
          </h1>
          <p>
            Pixelette Technologies empowers non-technical founders to get
            software solutions to their exact requirements without hiring
            expensive in-house teams
          </p>
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

        </header>
        <div style={{ marginTop: '-1rem' }}>
          <ContactUsForm
            header
            backgrounds
            insideHeading="Book a Discovery Session"
            pageName="Clutch"
          />
        </div>
      </div>
    </Container>
  );
};

export default ClutchForm;
