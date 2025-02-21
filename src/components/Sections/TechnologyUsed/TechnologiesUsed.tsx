'use client';

import { Container } from '@/components/Feature/Container/Container';
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

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div className="red-background-border" style={{ marginTop: '28rem' }}></div>
      </div>
      <div className={styles.technologiesMain} id="sideMargin">
        <Container className="main margins">

          <center>
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
                  {tab.replace('_', ' ')}
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
