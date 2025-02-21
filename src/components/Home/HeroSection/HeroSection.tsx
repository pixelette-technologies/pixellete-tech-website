import { Button } from '@/components/Feature/Button/Button';
import Link from 'next/link';
import React from 'react';
import styles from './herosection.module.css';
// import { Link as ScrollLink } from 'react-scroll';

type HeroSectionProps = object;

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <>
      <div className="main-content"></div>
      <div className={styles.heroSectionBackground}>
        {/* <Image
          src="/images/home/hero/homeHeroBackground.svg"
          alt="background"
          layout="responsive"
          width={1200}
          height={800}
          className={styles.heroBackgroundImg}
        /> */}
      </div>
      <div className={styles.heroSection}>
        <div className={styles.content}>
          <blockquote>
            {/* Loop through images using static paths in the public directory */}
            {Array.from({ length: 6 }).map((_, idx) => (
              <img
                key={idx}
                src={`/images/home/hero/box_${idx + 1}.svg`} // Static path for box images
                alt={`box ${idx + 1}`}
                loading="lazy"
                // className={`${styles.boxImage} ${styles[`.box${idx + 1}`]}`}
              />
            ))}
          </blockquote>
          <h1>
            Shaping the future with every line of code
          </h1>
          <p>
            At Pixelette Technologies, we are committed to crafting
            transformative technology that answers the problems to tomorrow’s
            world.
          </p>

          <div>
            {/* Using React Scroll for smooth scrolling */}
            <Link href="/contact-us">
              <Button
                className="primary"
                // data-aos="fade-up"
                // data-aos-duration="1100"
              >
                Consult our experts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
