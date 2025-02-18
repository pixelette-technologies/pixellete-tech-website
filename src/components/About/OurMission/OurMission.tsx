import { Container } from '@/components/Feature/Container/Container';

import React from 'react';
import './ourmission.css';

const OurMission: React.FC = () => {
  return (
    <div>
      <Container className="main">
        <div className="cardSectionBackground">
          <img
            src="/images/aiServices/serviceSectionBackground.svg"
            alt="aiServices"
          />
        </div>
      </Container>
      <Container className="main margins">
        <div className="main-container">
          <div className="section">
            <img
              className="image"
              src="/images/about/OurMissionImage1.png"
              alt="Our mission"
            />
            <div className="content">
              <h2>Our mission</h2>
              <p>
                We’re here to revolutionize how businesses use technology,
                driving them to not only achieve but exceed their potential.
                With each innovation, we aim to create trailblazing digital
                experiences that make a real-world impact.
              </p>
            </div>
          </div>

          <div className="section reverse">
            <img
              className="image"
              src="/images/about/OurMissionImage2.png"
              alt="Our vision"
            />
            <div className="content">
              <h2>Our vision</h2>
              <p>
                Our vision is simple: to inspire a world where businesses are
                empowered by powerful, accessible, and sustainable technology.
                We’re not just part of the technology evolution; we’re at its
                forefront, committed to setting a global standard for
                responsible and significant advancement.
              </p>
            </div>
          </div>

          <div className="section">
            <img
              className="image"
              src="/images/about/OurMissionImage3.png"
              alt="Our core values"
            />
            <div className="content">
              <h2>Our core values</h2>
              <div className="values">
                <h3>Building what’s next</h3>
                <p>
                  Innovation is our lifeblood. We’re not waiting for the future;
                  we’re actively building it, creating cutting-edge solutions that
                  redefine industries.
                </p>
                <h3>Raising the bar</h3>
                <p>
                  Excellence is our baseline. We aim for results that inspire,
                  setting the gold standard for technology solutions in every
                  industry we serve.
                </p>
                <h3>Trust in every step</h3>
                <p>
                  We believe in transparency and accountability, ensuring every
                  interaction and project builds trust and confidence with our
                  clients.
                </p>
                <h3>Creating together</h3>
                <p>
                  Success is a team sport. Whether it’s our clients, partners, or
                  team, we work collaboratively to achieve powerful outcomes that
                  drive shared success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OurMission;
