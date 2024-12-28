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

type NewServiceCardProps = {
  data: ServiceCardData[];
};

const NewServiceCard: FC<NewServiceCardProps> = ({ data }) => {
  return (
    <>
      {data.map((el, index) => {
        const cardContent = (
          <div className="new-servicecard">
            <div className="new-service-top">
              <Image
                src={el.icon}
                alt="icon"
                className="new-service-img"
                width={50}
                height={50}
              />
              <Text>
                <span className="service-heading">{el.name}</span>
              </Text>
            </div>
            <Text className="service-text">{el.description}</Text>
          </div>
        );

        const animationDuration = `2${index}00`;

        return el.path
          ? (
              <Link
                href={el.path}
                key={index}
                id="new-servicecard_id"
                className="new-servicecard"
                data-aos="fade-up"
                data-aos-duration={animationDuration}
                style={{ cursor: el.path ? 'pointer' : 'default' }}
              >
                {cardContent}
              </Link>
            )
          : (
              <div
                key={index}
                id="servicesCard_id"
                className="servicesCard"
                style={{
                  borderRadius: '8px',
                  fontSize: '2.5rem',
                  lineHeight: '5rem',
                  fontWeight: '300',
                  marginBottom: '8px',
                  width: '42rem',
                }}
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

export default NewServiceCard;
