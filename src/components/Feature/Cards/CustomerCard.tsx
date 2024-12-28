import type { FC } from 'react';
import Image from 'next/image';
import Text from '../Text/Text';
import './cards.css';

type CustomerCardProps = {
  image: string;
  review: string;
  name: string;
};

const CustomerCard: FC<CustomerCardProps> = ({ image, review, name }) => {
  return (
    <div className="customerCard">
      <Image src={image} alt="profile" width={100} height={100} />

      <div>
        <Image src="/home/stars.svg" alt="stars" width={120} height={24} />
      </div>

      <Text className="titory">
        “
        {' '}
        {review}
        {' '}
        ”
        <br />
        {name}
      </Text>
    </div>
  );
};

export default CustomerCard;
