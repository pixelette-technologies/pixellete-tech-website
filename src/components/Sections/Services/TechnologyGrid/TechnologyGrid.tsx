'use client';
import { Container } from '@/components/Feature/Container/Container';
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
        <h1
          id="h_ani"
        >
          {heading}
        </h1>
        <p>
          {description}
        </p>

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
              <p><b>{area.title}</b></p>
              {area.description && (
                <p>{area.description}</p>
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
            {selectedData
              ? (
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', gap: '2rem' }}>
                    <p><b>{selectedData.title}</b></p>
                    {selectedData.description && (
                      <p>
                        {selectedData.description}
                      </p>

                    )}
                  </div>
                )
              : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                    <p>
                      {extraDataMapping[expertiseAreas[0]?.title]?.title}
                    </p>
                    <p>
                      {extraDataMapping[expertiseAreas[0]?.title]?.description}
                    </p>
                  </div>
                )}
          </div>
        </div>
      </Container>
    </div>
  );
};
