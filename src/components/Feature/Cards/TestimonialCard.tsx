import type { FC } from 'react';
import Image from 'next/image';
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
      className="testimonialCard card-height"
      // style={{ height: '280px' }}
      data-aos={animation}
      data-aos-duration={duration}
    >
      <div>
        <Image src="/images/home/stars.svg" alt="Rating Stars" width={100} height={100} />
        <p>{rating}</p>
      </div>
      <p style={{ fontWeight: '700' }}>
        "
        {comment}
        "
      </p>

      <section>
        <Image
          src={profile}
          alt="profile"
          width={50}
          height={50}
          className="profile-img"
        />
        <div>
          <p>{userName}</p>
          <p>{role}</p>
        </div>
      </section>
    </div>
  );
};

export default TestimonialCard;
