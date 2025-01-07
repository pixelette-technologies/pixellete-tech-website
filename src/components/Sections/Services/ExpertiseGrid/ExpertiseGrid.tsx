import { Container } from '@/components/Feature/Container/Container';
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
            <h1>{header.title}</h1>
            <p>{header.description}</p>
          </header>
          <Marquee>
            <section className="marqueeCardss">
              {marqueeData.map((el, index) => (
                <div style={{ margin: '0 1rem' }} key={index}>
                  <img src={el.image} alt={el.text} />
                  <p>{el.text}</p>
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
                  <p>{el.text}</p>
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
