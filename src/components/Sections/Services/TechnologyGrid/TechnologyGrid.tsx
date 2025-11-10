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
  expertiseAreas,
  marqueeData,
  extraDataMapping,
}) => {
  const definedMarqueeData = marqueeData ?? [];
  const definedExpertiseAreas = expertiseAreas ?? [];

  const expertiseCards = definedExpertiseAreas.map(area => ({
    text: area.title,
    description:
      area.description ?? extraDataMapping?.[area.title]?.description,
    image: extraDataMapping?.[area.title]?.image,
  }));

  const cards = definedMarqueeData.length > 0 ? definedMarqueeData : expertiseCards;

  return (
    <>
      <Container className={styles.main}>
        {/* <div className={styles.cardSectionBackground}>
          <Image
            src={backgroundImage}
            alt="Background"
            className={styles.backgroundImage}
            width={1920}
            height={1080}
            priority
          />
        </div> */}
      </Container>
      <Container className={styles.main}>
        <div className={styles.expertiseGrid}>
          <header>
            <h2>
              {heading}
            </h2>
            <p>{description}</p>
          </header>

          <div className={styles.gridWrapper}>
            <div className={styles.gridContainer}>
              {cards.map(card => (
                <div className={styles.card} key={card.text}>
                  {card.image && (
                    <Image src={card.image} alt={card.text} width={44} height={44} />
                  )}
                  <p className={styles.cardTitle}>{card.text}</p>
                  {card.description && (
                    <p className={styles.cardDescription}>{card.description}</p>
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
