'use client';

import { Container } from '@/components/Feature/Container/Container';
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
    <div className={styles.technologiesMain}>
      <Container className="main margins">
        <center>
          <h1 id="h_ani">{title}</h1>
          <p>{subtitle}</p>
        </center>

        <div className={styles.technologiesLayout}>
          {/* Dynamic Tabs */}
          <div className={styles.tabsSection}>
            {Object.keys(technologies).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as keyof Technologies)}
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
                  <img src={tech.icon} alt={tech.name} className={styles.iconImg} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TechnologiesUsed;
