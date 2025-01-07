'use client';
import { Container } from '@/components/Feature/Container/Container';
import React, { useEffect, useState } from 'react';
import './ourservices.css';

type ServiceList = {
  title: string;
  items: string[];
};

type HighlightedService = {
  imageSrc: string;
  title: string;
  description: string;
};

type OurServicesProps = {
  heading: string;
  description: string;
  serviceLists: ServiceList[];
  highlightedService: HighlightedService;
  serviceMapping: Record<string, HighlightedService>; // Add this prop
};

export const OurServices: React.FC<OurServicesProps> = ({
  heading,
  description,
  serviceLists,
  highlightedService,
  serviceMapping, // Accept mapping as a prop
}) => {
  const [currentService, setCurrentService] = useState<HighlightedService>(highlightedService);

  const handleServiceClick = (item: string) => {
    if (!serviceMapping) {
      console.error('Service mapping is undefined.');
      return;
    }

    const newService = serviceMapping[item];
    if (newService) {
      // console.log('Setting current service to:', newService);
      setCurrentService(newService);
    } else {
      // console.error(`No service found for key: ${item}`);
    }
  };
  useEffect(() => {
    // console.log('Current service updated:', currentService);
  }, [currentService]);

  return (
    <div style={{ marginTop: '5rem' }} className="OurServicesBg">
      <Container className="main margins">
        <center>
          <h2>{heading}</h2>
          <br />
          <p>{description}</p>
        </center>
        <div className="ourServicesLists">
          {serviceLists.map((list, idx) => (
            <div key={idx}>
              {list.items.map((item, index) => (
                <p
                  key={index}
                >
                  <p onClick={() => handleServiceClick(item)}>
                    {item}
                  </p>
                </p>
              ))}
            </div>
          ))}
          <div
            style={{
              width: '450px',
              backgroundColor: '#0F0F0FB2',
              padding: '2rem',
              borderRadius: '13.84px',
              minHeight: '350px',
            }}
          >
            <img src={currentService.imageSrc} alt={currentService.title} />
            <br />
            <p>{currentService.title}</p>
            <br />
            <p>{currentService.description}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};
