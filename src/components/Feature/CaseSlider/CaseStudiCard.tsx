import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '../Heading/Heading';
import Text from '../Text/Text';
import './caseslider.css';

type CaseStudiCardProps = {
  to: string;
  image: string;
  tags: string[];
  name: string;
  description: string;
};

export const CaseStudiCard: FC<CaseStudiCardProps> = ({ to, image, tags, name, description }) => {
  return (
    <Link href={`/case-studies/${to}`} data-aos="fade-up" data-aos-duration="500">
      <div className="caseStudiSectionCard">
        <figure>
          <Image src={image} alt="Case Studies" width={300} height={200} />
        </figure>
        <div>
          <header>
            {tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </header>
          <h2 className="blogCardHeading">{name}</h2>
           <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};
