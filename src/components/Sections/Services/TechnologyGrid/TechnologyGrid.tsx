'use client';
import { Container } from '@/components/Feature/Container/Container';
import { backgroundImage } from '@/data/services/aiServices';
import Image from 'next/image';
import React from 'react';
import styles from '../ExpertiseGrid/expertisegrid.module.css';
import './technologygrid.css';

type ExpertiseArea = {
  title: string;
  description?: string;
};

type ExtraData = {
  title: string;
  description?: string;
  image?: string;
};

type TechnologyGridProps = {
  heading: string;
  description: string;
  expertiseAreas?: ExpertiseArea[];
  marqueeData?: Array<{ image?: string; text: string; description?: string }>;
  extraDataMapping?: Record<string, ExtraData>; // Mapping object
};

export const TechnologyGrid: React.FC<TechnologyGridProps> = ({
  heading,
  description,
  expertiseAreas = [],
  marqueeData,
  extraDataMapping: extraDataMapping,
}) => {
  // const [selectedData, setSelectedData] = useState<ExtraData | null>(null);
  // const [selectedData, setSelectedData] = useState<ExtraData | null>(
  //   Object.values(extraDataMapping)[0] || null,
  // );

  // const handleCardClick = (title: string) => {
  //   const data = extraDataMapping[title];
  //   setSelectedData(data);
  // };

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
              {heading}
            </h2>
            <p>{description}</p>
          </header>

          <center>

            {/* Grid Layout */}
            <div className={styles.gridContainer}>
              {(marqueeData && marqueeData.length > 0
                ? marqueeData
                : expertiseAreas.map(area => ({
                  text: area.title,
                  description:
                    area.description ?? extraDataMapping?.[area.title]?.description,
                  image: extraDataMapping?.[area.title]?.image,
                }))
              ).map((el, index: number) => (
                <div className={styles.flipCard} key={`${el.text}-${index}`}>
                  <div className={styles.flipCardInner}>
                    <div className={styles.flipCardFront}>
                      {el.image ? (
                        <Image src={el.image} alt={el.text} width={44} height={44} />
                      ) : null}
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
