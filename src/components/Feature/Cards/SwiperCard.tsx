import type { FC } from 'react';
import Image from 'next/image';
import Text from '../Text/Text';
import './cards.css';

type SwiperCardProps = {
  image: string;
  name: string;
  description: string;
  animation: string;
  duration: string;
};

const SwiperCard: FC<SwiperCardProps> = ({ image, name, description, animation, duration }) => {
  return (
    <div
      className="swiperCard"
      data-aos={animation}
      data-aos-duration={duration}
    >
      <figure>
        <Image src={image} alt="banner" width={300} height={200} />
      </figure>
      <Text className="primary--bold">{name}</Text>
      <Text className="titory--bold">{description}</Text>
    </div>
  );
};

export default SwiperCard;
