import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button/Button';
import './cards.css';

type DeliverHeroCardProps = {
  heroImage: string;
  category: string;
  id: string;
  name: string;
  description: string;
};

type CardProps = {
  image: string;
  blockChainLink: string;
  id: string;
  name: string;
  description: string;
};

export const Card: FC<CardProps> = ({ image, blockChainLink, id, name, description }) => {
  const truncateText = (text: string, maxLength: number): string =>
    text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;

  const truncatedName = truncateText(name, 50);
  const truncatedDescription = truncateText(description, 100);

  const link = `/case-study/${id}`;

  return (
    <Link href={link}>
      <div className="caseSlider-card">
        <div>
          <Image src={image} alt="slider hero" width={500} height={300} />
        </div>
        <div>
          <div>
            <Link href={link}>
              <Button className="primary">{blockChainLink}</Button>
            </Link>
          </div>
          <h1>{truncatedName}</h1>
          <p>{truncatedDescription}</p>
        </div>
      </div>
    </Link>
  );
};

const DeliverHeroCard: FC<DeliverHeroCardProps> = ({
  heroImage,
  category,
  id,
  name,
  description,
}) => {
  return (
    <div className="caseSlider">
      <section data-aos="fade-up" data-aos-duration="600">
        <Card
          image={heroImage}
          blockChainLink={category}
          id={id}
          name={name}
          description={description}
        />
      </section>
    </div>
  );
};

export default DeliverHeroCard;
