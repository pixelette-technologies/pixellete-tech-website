import { Container } from '@/components/Feature/Container/Container';
import React from 'react';
import './index.css';

type CommitmentData = {
  img: string;
  value1: string;
  value2: string;
  value3?: string;
  desc1: string;
  desc2: string;
  desc3?: string;
};

type OurCommitmentProps = {
  heading: string;
  description: string;
  commitmentData: CommitmentData[];
};

export const OurCommitment: React.FC<OurCommitmentProps> = ({
  heading,
  description,
  commitmentData,
}) => {
  return (
    <div>
      <Container className="main margins">
        <div className="expertiseGrid">
          <header>
            <h1>{heading}</h1>
          </header>
          <p>
            {description}
          </p>
          <section className="OurCommitmentCards">
            {commitmentData.map((el, index) => (
              <div style={{ margin: '0 1rem' }} key={index}>
                <img src={el.img} alt={`Commitment ${index + 1}`} />
                <div style={{ display: 'flex' }}>
                  <div>
                    <p>{el.value1}</p>
                    <p>{el.desc1}</p>
                  </div>
                  <hr style={{ margin: '0 1rem' }} />
                  <div>
                    <p>{el.value2}</p>
                    <p>{el.desc2}</p>
                  </div>
                  {el.desc3 && (
                    <>
                      <hr style={{ margin: '0 1rem' }} />
                      <div>
                        <p>{el.value3}</p>
                        <p>{el.desc3}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};
