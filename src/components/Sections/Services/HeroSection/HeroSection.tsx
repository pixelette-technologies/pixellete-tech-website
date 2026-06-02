import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './herosection.css';

type HeroSectionProps = {
  heading: string;
  subHeading?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  images: { src: string; alt: string }[];
  serviceName?: string;
};

// Helper function to check if the file is a video based on extension
const isVideoFile = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.m4v'];
  const lowerUrl = url.toLowerCase();
  return videoExtensions.some(ext => lowerUrl.endsWith(ext));
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  heading,
  subHeading,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
  images,
  serviceName,
}) => {
  const isVideo = isVideoFile(backgroundImage);

  // Service structured data for the service this page sells (server-rendered).
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': (serviceName ?? heading).replace(/\s+/g, ' ').replace(/[,;]\s*$/, '').trim(),
    'description': description.replace(/\s+/g, ' ').trim(),
    'provider': {
      '@type': 'Organization',
      'name': 'Pixelette Technologies',
      'url': 'https://pixelettetech.com',
    },
    'areaServed': 'Worldwide',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="heroSection-background">
        {isVideo
          ? (
              <>
                <video
                  src={backgroundImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="hero-background-img"
                />
                <img
                  src="/images/arvrServices/heroSectionBackground.svg"
                  alt="overlay"
                  className="arvr-overlay-image"
                />
              </>
            )
          : (
              <Image
                src={backgroundImage}
                alt="background"
                layout="responsive"
                width={1200}
                height={800}
                className="hero-background-img absolute"
              />
            )}
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
          <h1>
            {heading}
          </h1>
          {
            subHeading && (
              <center>
                <h2 className="quantum-sub-heading">
                  {subHeading}
                </h2>
              </center>
            )
          }
          <p>
            {description.split('\n').map((line, index, array) => (
              <React.Fragment key={index}>
                {line}
                {index < array.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>

          <div>
            <Link href={buttonLink}>
              <Button className="primary">
                {buttonText}
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button className="primary">
                Book a discovery call
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};
