import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { technologyStackAiData } from '@/data/technologyStackAiData';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import './ourservicessection.css';

const OurServicesSection: React.FC = () => {
  return (
    <div className="technologyStack">
      <center>
        <h2>
          We bring full-stack development services to the table
        </h2>
        <p>
          Explore our full suite of development services designed to deliver success to businesses across various industries.
        </p>

      </center>
      <Container className="main margins">
        <div className="margins" style={{ marginBottom: '3rem' }}>
          {technologyStackAiData.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '2rem 3rem',
                width: '23rem',
              }}
              data-aos="fade-up"
              data-aos-duration={600}
            >
              <img src={item.icon} alt="icon" />
              <h3>
                {item.title}
              </h3>
            </div>
          ))}
        </div>
        <center>
          <Button className="primary" animation="fade-up">
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
              }}
            >
              Explore All Services
              {' '}
              <FaExternalLinkAlt />
            </span>
          </Button>
        </center>
      </Container>
    </div>
  );
};

export default OurServicesSection;
