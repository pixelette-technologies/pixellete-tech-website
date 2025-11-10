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
          <Image
            src={backgroundImage}
            alt="Background"
            className={styles.backgroundImage}
            width={1920}
            height={1080}
            priority
          />
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

          <div className={styles.gridWrapper}>
            <div className={styles.gridContainer}>
              {marqueeData.map(el => (
                <div className={styles.card} key={el.text}>
                  <Image src={el.image} alt={el.text} width={44} height={44} />
                  <p className={styles.cardTitle}>{el.text}</p>
                  {el.description && (
                    <p className={styles.cardDescription}>{el.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ExpertiseGrid;
