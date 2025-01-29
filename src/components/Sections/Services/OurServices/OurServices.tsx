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
            <div key={idx}>
              {list.items.map((item, index) => (
                <p
                  key={index}
                >
                  <p onClick={() => handleServiceClick(item)}>
                    <strong>
                      {' '}
                      {item}
                      {' '}
                    </strong>
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
            <Image src={currentService.imageSrc} alt={currentService.title} width={100} height={100} />
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
