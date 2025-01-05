import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './caseslider.css';
import { Button } from '../Button/Button';
import Text from '../Text/Text';
import { Heading } from '../Heading/Heading';

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

  const truncatedName = truncateText(name, 15);
  const truncatedDescription = truncateText(description, 100);

  const link = `/case-studies/${id}`;

  return (
    <Link href={link}>
      <div className="caseSlider-card">
        <div>
          <img src={image} alt="slider hero" />
        </div>
        <div>
          <div>
            <Link href={link}>
              <Button className="primary">{blockChainLink}</Button>
            </Link>
          </div>
          <Heading className='primary'>{truncatedName}</Heading>
          <Text className="titory">{truncatedDescription}</Text>
        </div>
      </div>
    </Link>
  );
};
