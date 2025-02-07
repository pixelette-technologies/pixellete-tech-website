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
  // const [selectedData, setSelectedData] = useState<ExtraData | null>(null);

  const [selectedData, setSelectedData] = useState<ExtraData | null>(
    Object.values(extraDataMapping)[0] || null,
  );

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
                alignItems: 'center',
                // flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <h5
                style={{
                  color:
                  selectedData?.title === area.title ? '#4292FA' : '#fff',
                  transition: 'color 0.3s ease-in-out, transform 0.3s ease-in-out',
                }}
                // onMouseEnter={(e) => {
                //   e.currentTarget.style.transform = 'scale(1.05)';
                //   // e.currentTarget.style.color = '#4292FA'; // Change to your preferred hover color
                // }}
                // onMouseLeave={(e) => {
                //   e.currentTarget.style.transform = 'scale(1)';
                //   // e.currentTarget.style.color = '#fff'; // Reset to default
                // }}
              >
                {area.title}
              </h5>
              {index !== expertiseAreas.length - 1 && (
                <hr
                  style={{
                    border: '0',
                    borderLeft: '2px solid #ccc',
                    height: '100%',
                    margin: '0',
                  }}
                />
              )}
              {/* {area.description && (
                <p>{area.description}</p>
              )} */}
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
                    {/* <h5>{selectedData.title}</h5> */}
                    {selectedData.description && (
                      <p style={{ maxWidth: '55ch' }}>
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
