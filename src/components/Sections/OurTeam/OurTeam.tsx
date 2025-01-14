'use client';

import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import data from '@/data';
import Image from 'next/image';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ourteam.css';

type TeamCardProps = {
  image: string;
  role: string;
  name: string;
  animation: string;
  duration: string;
};

const TeamCard = ({ image, role, name, animation, duration }: TeamCardProps) => {
  return (
    <div data-aos={animation} data-aos-duration={duration}>
      <div className="image-container">
        <Image src={image} alt="team-image" width={100} height={100} quality={100} />
      </div>
      <p>
        {name}
      </p>
      <p>
        {role}
      </p>
    </div>
  );
};

export const OurTeam = () => {
  const [visibleCards, setVisibleCards] = useState(12);

  const handleLoadMore = () => {
    setVisibleCards(prev => prev + 8);
  };

  return (
    <div className="ourTeamSection">
      <Container className="main margins">
        <center>
          <h1
            id="h_ani"
          >
            Our Team
          </h1>
        </center>

        <p>
          The people behind the work.
          {' '}
          <br />
          {' '}
          90% of our team ranks among the global top 5 in their fields.
        </p>

        <section>
          {data.teamData.slice(0, visibleCards).map((el, index) => (
            <TeamCard
              image={el.image}
              role={el.role}
              name={el.name}
              key={uuidv4()}
              animation="fade-up"
              duration={`${index + 3}00`}
            />
          ))}
        </section>
        {visibleCards < data.teamData.length && (
          <div>
            <center style={{ marginTop: '4.8rem' }}>
              <Button className="primary" onClick={handleLoadMore}>
                Load More
              </Button>
            </center>
          </div>
        )}
      </Container>
    </div>
  );
};
