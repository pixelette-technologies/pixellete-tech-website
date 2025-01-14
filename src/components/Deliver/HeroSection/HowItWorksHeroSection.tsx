import Image from 'next/image';
import React from 'react';
import { Container } from '../../Feature/Container/Container';
import './herosection.css';

type HeroSectionProps = {
  backgroundImage: string;
  heading: string;
  text: string;
  deliverTitle: string;
  deliverDescription: string[];
  deliverImage: string;
};

const HowItWorksHeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  heading,
  text,
  deliverTitle,
  deliverDescription,
  deliverImage,
}) => {
  const imageStyle: React.CSSProperties = {
    width: 'auto', // Adjust the width as needed
    height: 'auto', // Maintain aspect ratio
    objectFit: 'cover', // Ensure the image covers the entire area without stretching
    borderRadius: '8px', // Optional: Add border radius to the images
  };

  return (
    <>
      <Container>
        <div className="heroSectionAiServices-background">
          <Image src={backgroundImage} alt="background" width={100} height={100} />
        </div>
      </Container>
      <div id="heroSectionAiServices" className="heroSectionAiServices">
        <Container>
          <center>
            <h1>
              {heading}
            </h1>
            <p>
              {text}
            </p>

          </center>
          <section>
            <div className="deliverHeroCard">
              <section>
                <h1>{deliverTitle}</h1>
                {deliverDescription.map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
              </section>
              <Image
                src={deliverImage}

                alt="Deliver Hero"
                style={imageStyle}
                width={450}
                height={450}
              />
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};

export default HowItWorksHeroSection;
