'use client';
import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
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

type ServiceMapping = {
  [key: string]: HighlightedService;
};

type OurServicesProps = {
  heading: string;
  description: string;
  serviceLists: ServiceList[];
  serviceMapping: ServiceMapping; // Add this prop
};

export const OurServices: React.FC<OurServicesProps> = ({
  heading,
  description,
  serviceLists,
  serviceMapping, // Accept mapping as a prop
}) => {
  const initialService = Object.values(serviceMapping)[0] || null;

  const [currentService, setCurrentService] = useState<HighlightedService | null>(
    initialService,
  );
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
    <div style={{ padding: '10rem 0' }} className="OurServicesBg">
      <Container className="main margins">
        <center>
          <h2>{heading}</h2>
          <br />
          <p>{description}</p>
        </center>
        <div className="ourServicesLists">
          {serviceLists.map((list, idx) => (
            <div
              key={idx}
              style={{ gap: '0rem' }}
            >
              {list.items.map((item, index) => (
                <div
                  key={index}
                  style={{ gap: '0rem' }}
                >
                  <p onMouseEnter={() => handleServiceClick(item)} style={{ fontSize: '1.5rem' }}>
                    <strong>
                      {' '}
                      {item}
                      {' '}
                    </strong>
                  </p>
                </div>
              ))}
            </div>
          ))}
          <div
            // className="ourServicesBlock"
            style={{
              width: '450px',
              backgroundColor: '#0F0F0FB2',
              padding: '2rem',
              borderRadius: '13.84px',
              height: '460px',
            }}
          >
            <Image src={currentService.imageSrc} alt={currentService.title} width={50} height={50} />
            <br />
            <h3>{currentService.title}</h3>
            <br />
            <p>{currentService.description}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};
