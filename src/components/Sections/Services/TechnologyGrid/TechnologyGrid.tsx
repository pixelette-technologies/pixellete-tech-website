"use client"
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import { Text } from '@/components/Feature/Text/Text';
import React, { useState } from 'react';
import './technologygrid.css';

type ExpertiseArea = {
  title: string;
  description?: string;
};

type ExtraData = {
  title: string;
  description?: string;
};

type TechnologyGridProps = {
  heading: string;
  description: string;
  expertiseAreas: ExpertiseArea[];
  extraDataMapping: Record<string, ExtraData>; // Mapping object
};

export const TechnologyGrid: React.FC<TechnologyGridProps> = ({
  heading,
  description,
  expertiseAreas,
  extraDataMapping,
}) => {
  const [selectedData, setSelectedData] = useState<ExtraData | null>(null);

  const handleCardClick = (title: string) => {
    const data = extraDataMapping[title];
    setSelectedData(data);
  };

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
          {/* Render expertise areas */}
          {expertiseAreas?.map((area, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-duration="600"
              onClick={() => handleCardClick(area.title)} // Handle click
              style={{
                cursor: 'pointer',
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
          ))}

          {/* Last div to display selected data */}
          <div
            style={{
              marginTop: '2rem',
              padding: '1rem',
              borderRadius: '8px',
            }}
          >
            {selectedData ? (
              <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', gap: '2rem'}}>
                <Text className="primary">{selectedData.title}</Text>
                {selectedData.description && (
                  <Text className="titory--bold">
                    {selectedData.description}
                  </Text>
                )}
              </div>
            ) : (
              <Text className="primary">Click on a card to see more details.</Text>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
