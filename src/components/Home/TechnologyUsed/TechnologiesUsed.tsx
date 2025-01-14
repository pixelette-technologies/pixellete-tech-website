'use client';

import { Container } from '@/components/Feature/Container/Container';
import technologies from '@/data/technologies';
import { useState } from 'react';
import styles from './technologiesused.module.css';

type Technology = {
  id: string;
  name: string;
  icon: string;
};

type Technologies = {
  [key: string]: Technology[];
};

const TechnologiesUsed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof Technologies>('AI_ML_BI');

  return (
    <div className={styles.technologiesMain}>
      <Container className="main margins">
        <center>
          <h1
            id="h_ani"
          >
            Benefit from our unmatched tech
            {' '}
            <br />
            stack expertise
          </h1>
          <p>
            With our team&apos;s deep mastery in the latest frameworks,
            languages, and tools, we build scalable, secure, and
            high-performance applications that set new standards. From ideation
            to deployment, our technology capabilities are designed to drive
            your business forward.
          </p>

        </center>

        <div className={styles.technologiesLayout}>
          <div className={styles.tabsSection}>
            {['AI_ML_BI', 'Software', 'Mobile', 'Blockchain'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as keyof Technologies)}
                className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

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
