import React from 'react';
import { Container } from '../../Feature/Container/Container';
import { Heading } from '../../Feature/Heading/Heading';
import Text from '../../Feature/Text/Text';
import './herosection.css';

const HeroSectionAiServices: React.FC = () => {
  const imageStyle: React.CSSProperties = {
    width: '100px', // Adjust the width as needed
    height: 'auto', // Maintain aspect ratio
    objectFit: 'cover', // Ensure the image covers the entire area without stretching
    borderRadius: '8px', // Optional: Add border radius to the images
  };

  return (
    <>
      <Container className="main margins">
        <div className="heroSectionAiServices-background">
          <img
            src="/images/aiServices/heroSectionBackground.svg"
            alt="background"
          />
        </div>
      </Container>
      <div id="heroSectionAiServices" className="heroSectionAiServices">
        <Container className="main margins">
          <center>
            <Heading
              className="secondry"
              animation="zoom-out"
              duration="2000"
            >
              From Concept to Completion, We Deliver
            </Heading>
            <Text className="primary" animation="zoom-in" duration="2200">
              We handle every step of development so you can concentrate on growth
            </Text>
          </center>
          <section>
            <div className="deliverHeroCard">
              <section>
                <h1>How It Works?</h1>
                <p>
                  Our complete outsourcing services take the entire software development process off your hands. We manage every aspect, from initial planning and design to development, testing, and deployment.
                </p>
                <p>
                  Once you provide your requirements and objectives, our team takes full control, assembling the right resources and managing the entire project. We work closely with you to ensure alignment with your vision, but the day-to-day execution is our responsibility.
                </p>
                <p>
                  You can expect a high-quality product delivered on time and within budget, without the need to manage the complexities of development themselves. You’ll have a ready-to-use solution tailored to your business needs, allowing you to focus on growth and strategy.
                </p>
              </section>
              <img
                src="/images/Deliver/deliverhero1.png"
                alt="Deliver Hero"
                style={imageStyle}
              />
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};

export default HeroSectionAiServices;
