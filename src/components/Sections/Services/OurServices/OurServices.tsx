'use client';
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
  serviceLists?: ServiceList[];
  serviceMapping?: ServiceMapping; // Add this prop
};

export const OurServices: React.FC<OurServicesProps> = ({
  heading,
  description,
  serviceLists = [],
  serviceMapping = {}, // Accept mapping as a prop
}) => {
  const initialService = Object.values(serviceMapping)[0] ?? null;

  const [currentService, setCurrentService] = useState<HighlightedService | null>(
    initialService,
  );
  useEffect(() => {
    if (!currentService) {
      const fallbackService = Object.values(serviceMapping)[0];
      if (fallbackService) {
        setCurrentService(fallbackService);
      }
    }
  }, [currentService, serviceMapping]);
  const handleServiceClick = (item: string) => {
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
      <div className="main margins arvrContainer">
        <center>
          <div className="ourServicesHeader">
            <h2>{heading}</h2>
            <p>
              {description.split('\n').map((line, index, array) => (
                <React.Fragment key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        </center>
        <div className="ourServicesLayout">
          <div className="ourServicesLeft">
            <div className="ourServicesListsar">
              {serviceLists.map((list, idx) => (
                <div
                  key={idx}
                  style={{ gap: '0rem' }}
                >
                  {list.items?.map((item, index) => (
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
            </div>
          </div>
          <div className="ourServicesRight">
            {currentService
              ? (
                  <div className="ourServicesBlock">
                    <Image src={currentService.imageSrc} alt={currentService.title} width={50} height={50} />
                    <h3>{currentService.title}</h3>
                    <div
                      className="ourServicesDescription"
                      dangerouslySetInnerHTML={{ __html: currentService.description.replace(/\n/g, '<br />') }}
                    />
                  </div>
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
