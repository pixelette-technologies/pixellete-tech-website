import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import React from 'react';
import styles from './expertisegrid.module.css';

type ExpertiseItem = {
  image: string;
  text: string;
  description?: string;
};

type ExpertiseGridProps = {
  header: {
    title: string;
    description: string;
  };
  marqueeData: ExpertiseItem[];
  backgroundImage: string;
};

const ExpertiseGrid: React.FC<ExpertiseGridProps> = ({
  header,
  marqueeData,
  backgroundImage,
}) => {
  return (
    <>
      <Container className={styles.main}>
        <div className={styles.cardSectionBackground}>
          <img src={backgroundImage} alt="Background" />
        </div>
      </Container>
      <Container className={styles.main}>
        <div className={styles.expertiseGrid}>
          <header>
            <h2>
              {header.title}
            </h2>
            <p>{header.description}</p>
          </header>

          <center>
          
           {/* Grid Layout */}
           <div className={styles.gridContainer}>
            {marqueeData.map((el, index) => (
              <div className={styles.flipCard} key={`${el.text}-${index}`}>
                <div className={styles.flipCardInner}>
                  <div className={styles.flipCardFront}>
                    <Image src={el.image} alt={el.text} width={44} height={44} />
                    <p>{el.text}</p>
                  </div>
                  <div className={styles.flipCardBack}>
                    {el.description ? <p>{el.description}</p> : null}
                  </div>
                </div>
              </div>
            ))}
            </div>

          </center>
        </div>
      </Container>
    </>
  );
};

export default ExpertiseGrid;
