"use client"
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
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
    console.log("Clicked item:", item);
  
    if (!serviceMapping) {
      console.error("Service mapping is undefined.");
      return;
    }
  
    const newService = serviceMapping[item];
    if (newService) {
      console.log("Setting current service to:", newService);
      setCurrentService(newService);
    } else {
      console.error(`No service found for key: ${item}`);
    }
  };
  useEffect(() => {
    console.log("Current service updated:", currentService);
  }, [currentService]);

  return (
    <div style={{ marginTop: '5rem' }} className="OurServicesBg">
      <Container className="main margins">
        <center>
          <Heading className="primary">{heading}</Heading>
          <br />
          <Text className="titory--bold">{description}</Text>
        </center>
        <div className="ourServicesLists">
          {serviceLists.map((list, idx) => (
            <div key={idx}>
              {list.items.map((item, index) => (
                <Text
                  key={index}
                  className="primary"
                >
                  <p onClick={() => handleServiceClick(item)}>
                  {item}
                  </p>
                </Text>
              ))}
            </div>
          ))}
          <div
            style={{
              width: '450px',
              backgroundColor: '#0F0F0FB2',
              padding: '2rem',
              borderRadius: '13.84px',
              height: '350px'
            }}
          >
            <img src={currentService.imageSrc} alt={currentService.title} />
            <br />
            <Text className="primary">{currentService.title}</Text>
            <br />
            <Text className="titory--bold">{currentService.description}</Text>
          </div>
        </div>
      </Container>
    </div>
  );
};
