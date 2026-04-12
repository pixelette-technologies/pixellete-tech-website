import { Container } from '@/components/Feature/Container/Container'; // Assuming the Container component is in this location
import { OurTeam } from '@/components/Sections/OurTeam/OurTeam';
import Image from 'next/image';
import React from 'react';
import './ourteamsection.css';

export const OurTeamSection: React.FC = () => {
  return (
    <>
      <Container className="main">
        <div className="ourTeamSectionHome-background">
          <Image src="/images/team/ourTeamBackground.png" alt="background" />
        </div>
      </Container>
      <div className="ourTeamSectionHome">
        <Container className="main">
          <blockquote>
            <Image src="/images/team/box_26.png}" alt="" />
            <Image src="/images/team/box_27.png}" alt="" />
          </blockquote>
        </Container>
      </div>
      <OurTeam />
    </>
  );
};
