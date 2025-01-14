import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import Link from 'next/link'; // Correct usage of Next.js routing
import React from 'react';
import './herosection.css';
// import { Link as ScrollLink } from 'react-scroll';

type HeroSectionProps = object;

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <>
      <div className="heroSection-background">
        {/* Use Next.js Image component for better optimization */}
        <Image
          src="/images/home/hero/homeHeroBackground.svg"
          alt="background"
          layout="responsive" // Makes the image responsive
          width={1200} // Set the width of the image
          height={800} // Set the height of the image
          className="hero-background-img"
        />
      </div>
      <div className="heroSection">
        <Container className="main margins">
          <blockquote>
            {/* Loop through images using static paths in the public directory */}
            {Array.from({ length: 7 }).map((_, idx) => (
              <img
                key={idx}
                src={`/images/home/hero/box_${idx + 1}.svg`} // Static path for box images
                alt={`box ${idx + 1}`}
                className={`box-image box-${idx + 1}`}
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
            <Link href="contactUs">
              <Button
                className="primary"
                data-aos="fade-up"
                data-aos-duration="1100"
              >
                Consult our experts
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};
