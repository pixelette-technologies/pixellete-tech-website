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
    <div className="technologyStackAi" id="sideMargin">
      <center>
        <h2
          id="h_ani"
        >
          {heading}
        </h2>
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
              <h5>{area.title}</h5>
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
                    <strong>{selectedData.title}</strong>
                    {selectedData.description && (
                      <p>
                        {selectedData.description}
                      </p>

                    )}
                  </div>
                )
              : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                    <h5>
                      {extraDataMapping[expertiseAreas[0]?.title]?.title}
                    </h5>
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
