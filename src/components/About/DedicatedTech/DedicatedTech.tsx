'use client';
import { Container } from '@/components/Feature/Container/Container';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './dedicatedtech.css';

type Card = {
  title: string;
  content: string[];
};

const cards: Card[] = [
  {
    title: 'Promise of Quality',
    content: [
      '97% customer satisfaction rating',
      '4.8 overall Clutch rating',
      '£100M+ in funding secured for client startups',
      '30,000+ hours in development across diverse industries',
    ],
  },
  {
    title: 'Global Reach',
    content: [
      '200+ team members across 13 countries, with 15+ locations and expanding',
      'Ranked among the top 30 software development companies globally (Clutch)',
    ],
  },
  {
    title: 'Impact Creation',
    content: [
      'Official Secretariat of the British Government’s AI policy body (APPG AI)',
      'Awarded ‘Best AI Agency UK’ three times by the Scotland Business Awards',
      '200+ successful projects with over 100+ million project views',
    ],
  },
];

const DedicatedTech: React.FC = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0); // Default to first card

  return (
    <div className="technologyStackAi" style={{ marginBottom: '10rem' }}>
      <center>
        <h2
          id="h_ani"
        >
          Your dedicated tech ally for growth at every stage — startups, SMEs
          and beyond
        </h2>
        <p>
        Since our founding in 2018 by Asif Ashiq Rana, we’ve evolved from a specialized agency into a global technology partner — now pioneering the convergence of AI, blockchain, and quantum computing.
        Our teams deliver innovation across artificial intelligence (including agentic systems and machine learning), blockchain, Web3, AR/VR, and enterprise software.
        </p>
        <p>
        We’re committed to helping organizations build the next generation of secure, intelligent, and scalable digital ecosystems.
        </p>

      </center>
      <Container className="main margins">
        <div className="margins" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between' }} id="sideMargin">
          <span
            className="dedicatedTechLinks"
          >
            {cards.map((card, index) => (
              <a
                key={index}
                className={`${
                  selectedCardIndex === index
                    ? 'selectedDedicatedCard'
                    : 'linkDedicatedCard'
                }`}

                onMouseEnter={() => setSelectedCardIndex(index)} // Update the selected card index
              >
                {card.title}
              </a>
            ))}
          </span>
          <div
            id="dedicatedDataCard"
            key={uuidv4()} // data-aos="fade-up" data-aos-duration="600"
          >
            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h3>{cards[selectedCardIndex].title}</h3>
              <div>
                {cards[selectedCardIndex].content.map(x => (
                  <ul key={selectedCardIndex}>
                    <li style={{ textAlign: 'left', listStyle: 'circle', fontSize: '1.6rem', fontWeight: '400', lineHeight: '3rem' }}>{x}</li>
                  </ul>
                ))}
              </div>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DedicatedTech;
