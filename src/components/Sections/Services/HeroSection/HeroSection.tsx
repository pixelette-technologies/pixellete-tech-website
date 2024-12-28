import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
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
          <Heading data-aos="zoom-out" data-aos-duration="700">
            {heading}
          </Heading>
          <Text className="primary" animation="zoom-in" duration="1000">
            {description}
          </Text>
          <div>
            <Link href={buttonLink}>
              <Button className="primary" animation="fade-up" duration="1100">
                {buttonText}
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};
