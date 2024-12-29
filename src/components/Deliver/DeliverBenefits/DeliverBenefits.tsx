import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import React from 'react';
import './deliverbenifits.css';

// Define the types for the card data
type CardData = {
  title: string;
  description: string;
};

type DeliverBenefitsProps = {
  heading: string;
  cards: CardData[];
};
const Cards: React.FC<{ cards: CardData[] }> = ({ cards }) => {
  return (
    <>
      <div
        className="benefit-line"
        style={{
          width: '80%',
          height: '2px',
          backgroundColor: 'grey',
          margin: '0 auto',
          marginTop: '50px',
          position: 'relative', // Added for proper positioning
        }}
      >
        {[0, 25, 50, 75].map((left, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: 'white',
              left: `${left}%`,
            }}
          />
        ))}
      </div>
      <div className="benifitsCard">
        {cards.map((card, index) => (
          <div key={index}>
            <h1>{card.title}</h1>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};
const DeliverBenefits: React.FC<DeliverBenefitsProps> = ({ heading, cards }) => {
  return (
    <div className="deliverBenifits">
      <Container className="main">
        <center data-aos-duration="700" data-aos="fade-up">
          <Heading className="primary" id="h_ani">
            {heading}
          </Heading>
        </center>
        <div data-aos-duration="500" data-aos="fade-up">
          <Cards cards={cards} />
        </div>
      </Container>
    </div>
  );
};

export default DeliverBenefits;
