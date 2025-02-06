import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import React from 'react';
import './servicework.css';

const ServiceCards: React.FC = () => {
  const cardData = [
    {
      step: '01',
      title: 'Free Discovery Call',
      description: `We chat about your project scope, service type, 
        tech requirements, timeline, suitable budget - everything.`,
    },
    {
      step: '02',
      title: 'Proposal Creation',
      description: `Then we iron out the details, send you over 
        everything we’ve meticulously planned for your project.`,
    },
    {
      step: '03',
      title: 'Kickoff',
      description: `If it’s a match, we hit start on whichever 
        service you’ve opted for and deliver quick!`,
    },
  ];

  return (
    <div className="serviceWorkCards">
      {cardData.map((card, index) => (
        <section key={index}>
          <h3>{card.step}</h3>
          <h2>{card.title}</h2>
          <p>{card.description}</p>
        </section>
      ))}
    </div>
  );
};
const ServiceWork: React.FC = () => {
  return (
    <div className="SelectPlan" style={{ marginTop: '100px' }}>
      <Container className="main">
        <center // data-aos-duration="700" data-aos="fade-up"
        >
          <h2 id="h_ani">
            Here’s How Our Services Work
          </h2>
          <Button className="primary--light btn-sm mt-2">Book a Free Call</Button>
        </center>
        <div // data-aos-duration="500" data-aos="fade-up"
        >
          <ServiceCards />
        </div>
      </Container>
    </div>
  );
};

export default ServiceWork;
