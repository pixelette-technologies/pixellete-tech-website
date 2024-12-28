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
  // const truncateText = (text: string, maxLength: number) =>
  //   text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;

  // const truncatedName = truncateText(name, 50);
  // const truncatedDescription = truncateText(description, 100);

  const link = `/case-study/${id}`;

  return (
    <Link href={link}>
      <div className="caseSlider-card">
        <div>
          <Image src={image} alt="slider hero" width={300} height={200} />
        </div>
        {/* <div>
          <div>
            <Link href={link}>
              <Button className="primary">{blockChainLink}</Button>
            </Link>
          </div>
          <h1>{truncatedName}</h1>
          <Text className="titory">{truncatedDescription}</Text>
        </div> */}
      </div>
    </Link>
  );
};
