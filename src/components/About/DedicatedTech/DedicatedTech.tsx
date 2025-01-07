'use client';
import { Container } from '@/components/Feature/Container/Container';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './dedicatedtech.css';

type Card = {
  title: string;
  content: string;
};

const cards: Card[] = [
  {
    title: 'Promise of Quality',
    content:
      '97% customer satisfaction rating 2. 4.8 overall Clutch rating 3. £100M+ in funding secured for client startups 4. 30,000+ hours in development across diverse industries',
  },
  {
    title: 'Global Reach',
    content:
      'Operating in 15+ countries, delivering innovative solutions globally.',
  },
  {
    title: 'Impact Creation',
    content:
      'Empowering clients with transformational technology for sustainable impact.',
  },
];

const DedicatedTech: React.FC = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0); // Default to first card

  return (
    <div className="technologyStackAi">
      <center>
        <h2
          id="h_ani"
        >
          Your dedicated tech ally for growth at every stage — startups, SMEs
          and beyond
        </h2>
        <p>
          Since our founding in 2018 by Asif Ashiq Rana, we’ve transformed from
          a specialized agency to a global tech partner, leading in providing
          development services across artificial intelligence and machine
          learning (AI/ML), crypto and blockchain, AR/VR, web, mobile and
          software development.
          </p>
        
      </center>
      <Container className="main margins">
        <div className="margins" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between' }}>
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

                onClick={() => setSelectedCardIndex(index)} // Update the selected card index
              >
                {card.title}
              </a>
            ))}
          </span>
          <div id="dedicatedDataCard" key={uuidv4()} data-aos="fade-up" data-aos-duration="600">
            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <p>{cards[selectedCardIndex].title}</p>
              <p>
                {cards[selectedCardIndex].content}
                </p>
              
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DedicatedTech;
