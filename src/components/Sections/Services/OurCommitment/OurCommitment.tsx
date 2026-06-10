import { Container } from '@/components/Feature/Container/Container';
import Link from 'next/link';
import React from 'react';
import styles from './ourcommitment.module.css';

type CommitmentData = {
  img: string;
  link?: string;
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
    <div id="sideMargin">
      <Container className="main margins">
        <div className={styles.expertiseGrid} style={{ padding: '10rem 0' }}>
          <center style={{ margin: '3rem 0' }}>
            <h2>{heading}</h2>
            <p>
              {description}
            </p>
          </center>
          <section className={styles.OurCommitmentCards}>
            {commitmentData.map((el, index) => (
              <Link href={el.link && el.link ? el.link : '/#'}>
                <div style={{ margin: '0 1rem' }} key={index}>
                  <img loading="lazy" src={el.img} alt={`Commitment ${index + 1}`} />
                  <div style={{ display: 'flex' }}>
                    <div>
                      <p className={styles.valueText}>{el.value1}</p>
                      <p className={styles.descText}>{el.desc1}</p>
                    </div>
                    <hr className={styles.verticalDivider} />
                    <div>
                      <p className={styles.valueText}>{el.value2}</p>
                      <p className={styles.descText}>{el.desc2}</p>
                    </div>
                    {el.desc3 && (
                      <>
                        <hr className={styles.verticalDivider} />
                        <div>
                          <p className={styles.valueText}>{el.value3}</p>
                          <p className={styles.descText}>{el.desc3}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};
