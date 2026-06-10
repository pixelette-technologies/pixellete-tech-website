import { Container } from '@/components/Feature/Container/Container';
import { technologyStackAiData } from '@/data/technologyStackAiData';
import Link from 'next/link';
import React from 'react';
import './ourservicessection.css';

const OurServicesSection: React.FC = () => {
  return (
    <div className="technologyStack" id="sideMargin">
      <center className="mobilePadding">
        <h2>
          We engineer full-stack solutions across blockchain, agentic ai & frontier tech
        </h2>
        <p>
          Explore our complete suite of development services, combining enterprise-grade blockchain, intelligent AI systems, and quantum-ready architectures to drive measurable transformation across industries.
          {' '}
        </p>

      </center>
      <Container className="main margins">
        <div className="margins" style={{ marginBottom: '3rem' }}>
          {technologyStackAiData.map((item, index) => (
            <Link
              href={item.link}
              key={index}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '2rem 3rem',
                  height: '100%',
                  minHeight: '120px',
                  cursor: 'pointer',
                }}
              // data-aos="fade-up"
              // data-aos-duration={600}
              >
                <img loading="lazy" src={item.icon} alt="icon" />
                <h4
                  style={{
                    fontSize: '20px',
                    lineHeight: '2.5rem',
                  }}
                >
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
        {/* <center>
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
        </center> */}
      </Container>
    </div>
  );
};

export default OurServicesSection;
