import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Text from '../Text/Text';
import './cards.css';

type ServiceCardData = {
  icon: string;
  name: string;
  description: string;
  path?: string;
};

type ServicesCardProps = {
  data: ServiceCardData[];
};

const ServicesCard: FC<ServicesCardProps> = ({ data }) => {
  return (
    <>
      {data.map((el, index) => {
        const cardContent = (
          <div>
            <Image src={el.icon} alt="icon" width={50} height={50} />
            <p>{el.name}</p>
             <p>{el.description}</p>
          </div>
        );

        const animationDuration = `2${index}00`;

        return el.path
          ? (
              <Link
                href={el.path}
                key={index}
                id="servicesCard_id"
                className="servicesCard"
                data-aos="fade-up"
                data-aos-duration={animationDuration}
                style={{ cursor: 'pointer' }}
              >
                {cardContent}
              </Link>
            )
          : (
              <div
                key={index}
                id="servicesCard_id"
                className="servicesCard"
                data-aos="fade-up"
                data-aos-duration={animationDuration}
              >
                {cardContent}
              </div>
            );
      })}
    </>
  );
};

export default ServicesCard;
