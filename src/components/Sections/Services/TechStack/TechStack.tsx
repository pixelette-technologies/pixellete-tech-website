import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
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
          <img loading="lazy"
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
              <h2>
                Our
                {' '}
                {props?.techStack ? props.techStack : 'AI'}
                {' '}
                development tech stack
              </h2>
              <br />
              <p>
                Our go-to tech for unmatched results
              </p>

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
              <Image src="/images/aiServices/techStackImg.png" alt="" width={876} height={512} style={{ height: 'auto' }} />
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
