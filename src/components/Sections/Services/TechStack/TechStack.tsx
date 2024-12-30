import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
import React from 'react';
import './techstack.css';

type TechStackProps = {
  // Define any props here if needed in the future
  techStack: string;
};

export const TechStack: React.FC<TechStackProps> = (props: TechStackProps) => {
  return (
    <div>
      <Container className="main">
        <div className="cardSectionBackground">
          <img
            src="/images/aiServices/serviceSectionBackground.svg"
          />
        </div>
      </Container>
      <Container className="main margins">
        <center>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}
          >
            <div>
              <Heading className="primary">
                Our
                {' '}
                {props?.techStack ? props.techStack : 'AI'}
                {' '}
                development tech stack
              </Heading>
              <br />
              <Text className="titory--bold">
                Our go-to tech for unmatched results
              </Text>
            </div>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <img src="/images/aiServices/techStackImg.png" alt="" style={{ height: 'auto' }} />
              <span style={{ position: 'absolute', textAlign: 'center' }}>
                <p
                  style={{
                    color: '#',
                  }}
                  className="teckStackText"
                >
                  AI Development
                  {' '}
                  <br />
                  {' '}
                  Tech Stack
                </p>
              </span>
            </div>
          </div>
        </center>
      </Container>
    </div>
  );
};
