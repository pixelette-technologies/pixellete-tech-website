import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './caseslider.css';

type CardProps = {
  id: string;
  image: string;
  blockChainLink: string;
  name: string;
  description: string;
};

export const Card: FC<CardProps> = ({ id, image, blockChainLink, name, description }) => {
  const truncateText = (text: string, maxLength: number) =>
    text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;

  // const truncatedName = truncateText(name, 25);
  // const truncatedDescription = truncateText(description, 80);

  const link = `/case-studies/${id}`;

  return (
    <Link href={link}>
      <div className="caseSlider-card">
        <div>
          <Image
            src={image}
            alt={id}
            height={100}
            width={100}
            style={{ objectFit: 'cover' }}
            quality={100}
          />

          {/* <img src={image} alt="slider hero" /> */}
        </div>
        {/* <div>
          <div>
            <Link href={link}>
              <Button className="primary">{blockChainLink}</Button>
            </Link>
          </div>
          <h3>{truncatedName}</h3>
          <p>{truncatedDescription}</p>
        </div> */}
      </div>
    </Link>
  );
};
