import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import './cards.css';

type PlanData = {
  icon: string;
  iconhead: string;
  name: string;
  description: string;
  link: string;
  linkIcon: string;
  path?: string;
};

type YourPlanCardProps = {
  data: PlanData[];
};

const YourPlanCard: FC<YourPlanCardProps> = ({ data }) => {
  return (
    <>
      {data.map((el, index) => {
        const cardContent = (
          <div>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  backgroundColor: '#006FF026',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '5px 20px',
                  borderRadius: '100px',
                }}
              >
                <Image
                  src={el.icon}
                  alt="icon"
                  width={20}
                  height={20}
                />
                <h4>{el.iconhead}</h4>
              </div>
            </div>
            <p>{el.name}</p>
            <p>{el.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '1rem' }}>
              <Link href={el.path}>
                {el.link}
                {' '}
                <FaExternalLinkAlt />
              </Link>
              <div>
                <p>{el.link}</p>
              </div>
              {' '}
              <div>
                <Image
                  src={el.linkIcon}
                  alt="link icon"
                  width={10}
                  height={10}
                />
              </div>
            </div>
          </div>
        );

        return !el.path
          ? (
              <Link href={el.path} key={uuidv4()} passHref>
                {cardContent}
                {/* <a
                  id="servicesCard_id"
                  className="servicesCard"
                  data-aos="fade-up"
                  data-aos-duration={`2${index}00`}
                  style={{ cursor: el.path ? 'pointer' : 'default' }}
                >
                  {cardContent}
                </a> */}
              </Link>
            )
          : (
              <div
                key={uuidv4()}
                id="servicesCard_id"
                className="servicesCard"
                data-aos="fade-up"
                data-aos-duration={`2${index}00`}
              >
                {cardContent}
              </div>
            );
      })}
    </>
  );
};

export default YourPlanCard;
