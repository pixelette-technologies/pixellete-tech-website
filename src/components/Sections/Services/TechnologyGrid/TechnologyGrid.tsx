import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import { Text } from '@/components/Feature/Text/Text';
import React from 'react';
import './technologygrid.css';

type ExpertiseArea = {
  title: string;
  description?: string;
};

type TechnologyGridProps = {
  heading: string;
  description: string;
  expertiseAreas: ExpertiseArea[];
};

export const TechnologyGrid: React.FC<TechnologyGridProps> = ({
  heading,
  description,
  expertiseAreas,
}) => {
  return (
    <div className="technologyStackAi">
      <center>
        <Heading
          className="secondry"
          animation="fade-up"
          duration="600"
          id="h_ani"
        >
          {heading}
        </Heading>
        <Text className="titory--bold" animation="fade-up" duration="700">
          {description}
        </Text>
      </center>
      <Container className="main margins">
        <div className="margins" style={{ marginBottom: '3rem' }}>
          {expertiseAreas.map((area, index) => (
            <div key={index} data-aos="fade-up" data-aos-duration="600">
              <div
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <Text className="primary">{area.title}</Text>
                {area.description && (
                  <Text className="titory--bold">{area.description}</Text>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
