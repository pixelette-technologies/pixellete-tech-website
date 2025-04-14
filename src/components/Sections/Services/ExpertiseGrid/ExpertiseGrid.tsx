import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';
import styles from './expertisegrid.module.css';

type ExpertiseItem = {
  image: string;
  text: string;
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

          {/* First Marquee with first half of marqueeData */}
          <div className="marquee-container">
            <Marquee pauseOnHover loop={0}>
              <section className={styles.marqueeCardss}>
                {marqueeData.slice(0, Math.ceil(marqueeData.length / 2)).map((el, index) => (
                  <div className={styles.flipCard} key={index}>
                    <div className={styles.flipCardInner}>
                      <div className={styles.flipCardFront}>
                        <Image src={el.image} alt={el.text} width={44} height={44} />
                        <p>{el.text}</p>
                      </div>
                      <div className={styles.flipCardBack}>
                        {el.description}
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </Marquee>
          </div>
          <br />

          {/* Second Marquee with second half of marqueeData */}
          <Marquee direction="right" pauseOnHover loop={0}>
            <section className={styles.marqueeCardss}>
              {marqueeData.slice(Math.ceil(marqueeData.length / 2)).map((el, index) => (
                <div className={styles.flipCard} key={index}>
                  <div className={styles.flipCardInner}>
                    <div className={styles.flipCardFront}>
                      <Image src={el.image} alt={el.text} width={44} height={44} />
                      <p>{el.text}</p>
                    </div>
                    <div className={styles.flipCardBack}>
                      <p>{el.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </Marquee>
        </div>
      </Container>
    </>
  );
};

export default ExpertiseGrid;
