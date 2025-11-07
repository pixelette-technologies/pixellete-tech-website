'use client';

import { Container } from '@/components/Feature/Container/Container';
import { backgroundImage } from '@/data/services/aiServices';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './technologiesused.module.css';

type Technology = {
  id: number;
  name: string;
  icon: string;
};

type Technologies = {
  [key: string]: Technology[];
};

type TechnologiesUsedProps = {
  technologies: Technologies;
  title: string;
  subtitle: string;
};

const TechnologiesUsed: React.FC<TechnologiesUsedProps> = ({ technologies, title, subtitle }) => {
  const [activeTab, setActiveTab] = useState<keyof Technologies>(Object.keys(technologies)[0] as keyof Technologies);

  // const shortenTechName = (name: string) => {
  //   const techMap: { [key: string]: string } = {
  //     'AI development': 'AI',
  //     'Blockchain development': 'Blockchain',
  //     // Add more mappings as needed
  //   };
  //   return techMap[name] || name; // Return the shortened name or original if no mapping exists
  // };

  return (
    <>

      <Container className={styles.main}>
        <div className={styles.cardSectionBackground}>
          <img src={backgroundImage} alt="Background" />
        </div>
      </Container>
      <div className={styles.technologiesMain} id="sideMargin">
        <Container className="main margins">
          <center className={styles.mobilePadding}>
            <h2 id="h_ani">{title}</h2>
            <p>{subtitle}</p>
          </center>

          <div className={styles.technologiesLayout}>
            {/* Dynamic Tabs */}
            <div className={styles.tabsSection}>
              {Object.keys(technologies).map(tab => (
                <button
                  key={tab}
                  onMouseEnter={() => setActiveTab(tab as keyof Technologies)}
                  className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
                >
                  {/* {tab.replace('_', ' ')} */}
                  <span className={`${styles.technologyName} ${styles.fullName}`}>
                    {tab.replace('_', ' ')}
                    {' '}
                    {/* Full name on desktop */}
                  </span>
                  <span className={`${styles.technologyName} ${styles.shortName}`}>
                    {/* {tab.split(' ')[0]} */}

                    {tab?.split(' ')[0]?.replace(/[^a-z0-9]/gi, '') || ''}

                  </span>
                </button>
              ))}
            </div>

            {/* Content Section */}
            <div className={`${styles.contentSection} ${activeTab ? styles.active : ''}`} key={activeTab}>
              <div className={styles.iconsContainer}>
                {technologies[activeTab]?.map(tech => (
                  <div className={styles.iconCard} key={tech.id}>
                    <Image src={tech.icon} alt={tech.name} width={100} height={60} className={styles.iconImg} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TechnologiesUsed;
