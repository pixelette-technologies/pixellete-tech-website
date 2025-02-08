import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './herosection.css';

type HeroSectionProps = {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  images: { src: string; alt: string }[];
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  heading,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
  images,
}) => {
  return (
    <>
      <div className="heroSection-background">
        <Image
          src={backgroundImage}
          alt="background"
          layout="responsive"
          width={1200}
          height={800}
          className="hero-background-img"
        />
      </div>
      <div className="heroSection">
        <Container className="main margins">
          <blockquote>
            {images.map((image, idx) => (
              <img
                key={idx}
                src={image.src}
                alt={image.alt}
                className={`box-image box-${idx + 1}`}
              />
            ))}
          </blockquote>
          <h2>
            {heading}
          </h2>
          <p>
            {description}
          </p>

          <div>
            <Link href={buttonLink}>
              <Button className="primary">
                {buttonText}
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};
