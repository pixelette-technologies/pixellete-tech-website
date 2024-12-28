import type { FC } from 'react';
import Image from 'next/image';
import Text from '../Text/Text';
import './cards.css';

type TestimonialCardProps = {
  animation: string;
  duration: string;
  rating: string;
  comment: string;
  profile: string;
  userName: string;
  role: string;
};

export const TestimonialCard: FC<TestimonialCardProps> = ({
  animation,
  duration,
  rating,
  comment,
  profile,
  userName,
  role,
}) => {
  return (
    <div
      className="testimonialCard"
      data-aos={animation}
      data-aos-duration={duration}
    >
      <div>
        <Image src="/images/home/stars.svg" alt="Rating Stars" width={100} height={100} />
        <Text className="primary">{rating}</Text>
      </div>
      <Text className="primary">
        “
        {comment}
        {' '}
        ”
      </Text>

      <section>
        <Image
          src={profile}
          alt="profile"
          width={50}
          height={50}
          className="profile-img"
        />
        <div>
          <Text className="primary--bold">{userName}</Text>
          <Text className="titory">{role}</Text>
        </div>
      </section>
    </div>
  );
};

export default TestimonialCard;
