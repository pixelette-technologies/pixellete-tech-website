'use client';

import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { teamData } from '@/data/teamData';
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
  linkedin?: string;
};

const TeamCard = ({ image, role, name, animation, duration, linkedin }: TeamCardProps) => {
  return (
    <div data-aos={animation} data-aos-duration={duration} className="team-card">
      <div className="image-container">
        <Image src={image} alt={`${name}'s profile`} width={100} height={100} quality={100} />
      </div>
      <div className="team-info">
        <h3>{name}</h3>
        <p>{role}</p>
        {linkedin && (
          <a 
            href={linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="linkedin-link"
            aria-label={`${name}'s LinkedIn profile`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export const OurTeam = () => {
  const [visibleCards, setVisibleCards] = useState(12);

  const handleLoadMore = () => {
    setVisibleCards(prev => prev + 8);
  };
  const generateSchema = () => {
    const peopleSchema = teamData.map(el => ({
      '@type': 'Person',
      'name': el.name,
      'jobTitle': el.role,
      'image': el.image,
      ...(el.linkedin && { 'sameAs': [el.linkedin] }),
      'worksFor': {
        '@type': 'Organization',
        'name': 'Pixelette Technologies'
      }
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Pixelette Technologies',
      'description': 'A leading technology company specializing in AI, Blockchain, and software development solutions.',
      'url': 'https://pixelette.com',
      'logo': 'https://pixelette.com/images/logo.png',
      'member': peopleSchema,
      'numberOfEmployees': {
        '@type': 'QuantitativeValue',
        'value': teamData.length
      },
        "address": {
    "@type": "PostalAddress",
    "streetAddress": "71-75 Shelton Street",
    "addressLocality": "London",
    "postalCode": "WC2 H9J",
    "addressCountry": "UK"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+44 2045188226",
    "contactType": "customer service",
    "email": "sales@pixelettetech.com"
  }

    };
  };
  return (
    <div className="ourTeamSection">
      <Container className="main margins">
        <center>
          <h2
            id="h_ani"
          >
            Our Team
          </h2>
        </center>

        <p>
          The people behind the work.
          {' '}
          <br />
          {' '}
          90% of our team ranks among the global top 5 in their fields.
        </p>

        <section>
          {teamData.slice(0, visibleCards).map((el, index) => (
            <TeamCard
              image={el.image}
              role={el.role}
              name={el.name}
              key={uuidv4()}
              animation="fade-up"
              duration={`${index + 3}00`}
              linkedin={el.linkedin}
            />
          ))}
        </section>
        {visibleCards < teamData.length && (
          <div>
            <center style={{ marginTop: '4.8rem' }}>
              <Button className="primary" onClick={handleLoadMore}>
                Load More
              </Button>
            </center>
          </div>
        )}
      </Container>
      {/* JSON-LD Script for People Schema */}
      <script type="application/ld+json">
        {JSON.stringify(generateSchema())}
      </script>
    </div>
  );
};
