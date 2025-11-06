import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../Button/Button';
import './caseslider.css';

type CaseStudiCardProps = {
  to: string; // URL path for navigation
  frontImageSrc: string; // Image source for the front side
  backImageSrc: string; // Image source for the back side
  description: string; // Description text for the front side
  title: string; // Title for the back side
  tags: string[]; // Tags for the back side
  buttonText?: string; // Button text
  onButtonClick?: () => void; // Button click handler
};

export const CaseStudyCard: FC<CaseStudiCardProps> = ({
  to,
  frontImageSrc,
  backImageSrc,
  description,
  title,
  tags,
  buttonText = 'View Project Details',
  onButtonClick,
}) => {
  return (
    <Link href={`/case-studies/${to}`} data-aos="fade-up" data-aos-duration="500" className="sm-mb-1">
      <div className="cardContainer">
        <div className="flipCard">
          {/* Front Side */}
          <div
            className="cardFront"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyItems: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <figure>
              <Image
                style={{ margin: '0 auto' }}
                src={frontImageSrc}
                alt="Case Studies Front"
                width={256}
                height={90}
                quality={100}
              />
            </figure>
            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', paddingTop: '5rem' }}>
              <p style={{ fontSize: '1.3rem', width: '80%', margin: '0 auto', textAlign: 'center' }}>
                {description}
              </p>
            </div>
          </div>

          {/* Back Side */}
          <div className="cardBack">
            <figure>
              <Image
                src={backImageSrc}
                alt="Case Studies Back"
                width={300}
                height={200}
                quality={100}
              />
            </figure>
            <div style={{ margin: '1rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h3 className="blogCardHeading">{title}</h3>
              <div className="cardBackTags">
                {tags.map((tag, index) => (
                  <p key={index}>{tag}</p>
                ))}
              </div>
              <div>
                <Button className="primary" animation="fade-up" duration="2400" onClick={onButtonClick}>
                  {buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
