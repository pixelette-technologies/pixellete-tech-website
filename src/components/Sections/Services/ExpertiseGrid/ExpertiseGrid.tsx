import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
import React from 'react';
import Marquee from 'react-fast-marquee';
import './expertisegrid.css';

type ExpertiseItem = {
  image: string;
  text: string;
};

type ExpertiseGridProps = {
  header: {
    title: string;
    description: string;
  };
  marqueeData: ExpertiseItem[];
  backgroundImage: string;
};

const ExpertiseGrid: React.FC<ExpertiseGridProps> = ({
  header,
  marqueeData,
  backgroundImage,
}) => {
  return (
    <>
      <Container className="main">
        <div className="cardSectionBackground">
          <img src={backgroundImage} alt="Background" />
        </div>
      </Container>
      <Container className="main">
        <div className="expertiseGrid">
          <header>
            <Heading className="secondry">{header.title}</Heading>
            <Text className="secondry">{header.description}</Text>
          </header>
          <Marquee>
            <section className="marqueeCardss">
              {marqueeData.map((el, index) => (
                <div style={{ margin: '0 1rem' }} key={index}>
                  <img src={el.image} alt={el.text} />
                  <Text className="titory--bold">{el.text}</Text>
                </div>
              ))}
            </section>
          </Marquee>
          <br />
          <Marquee direction="right">
            <section className="marqueeCardss">
              {marqueeData.map((el, index) => (
                <div style={{ margin: '0 1rem' }} key={index}>
                  <img src={el.image} alt={el.text} />
                  <Text className="titory--bold">{el.text}</Text>
                </div>
              ))}
            </section>
          </Marquee>
        </div>
      </Container>
    </>
  );
};

export default ExpertiseGrid;
