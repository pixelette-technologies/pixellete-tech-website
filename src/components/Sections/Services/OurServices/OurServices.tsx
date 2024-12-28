import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
import React from 'react';
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
};

export const OurServices: React.FC<OurServicesProps> = ({
  heading,
  description,
  serviceLists,
  highlightedService,
}) => {
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
                <Text key={index} className="primary">
                  {item}
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
            }}
          >
            <img src={highlightedService.imageSrc} alt={highlightedService.title} />
            <br />
            <Text className="primary">{highlightedService.title}</Text>
            <br />
            <Text className="titory--bold">{highlightedService.description}</Text>
          </div>
        </div>
      </Container>
    </div>
  );
};
