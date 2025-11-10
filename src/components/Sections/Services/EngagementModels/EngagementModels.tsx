'use client';

import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import Link from 'next/link';
import React from 'react';
import styles from './engagementmodels.module.css';
import { redBackground, redBackgroundLower } from '@/data/services/aiServices';

export type EngagementModel = {
  engagementType: string;
  idealFor: string;
  benefits: string;
};

type EngagementModelsProps = {
  title?: string;
  description?: string;
  models: EngagementModel[];
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
};

export const EngagementModels: React.FC<EngagementModelsProps> = ({
  title = 'Flexible Engagement Models',
  description = 'Whether you need a full AR/VR solution or skilled specialists to extend your in-house team, our engagement models adapt to your project\'s needs and timeline.',
  models,
  primaryButtonText = 'Start with a pilot project',
  primaryButtonLink = '/contact',
  secondaryButtonText = 'Scale your team',
  secondaryButtonLink = '/contact',
}) => {
  return (
    <section className={styles.section}>

      <Container className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Engagement Type</th>
                <th>Ideal For</th>
                <th>Benefits</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model, index) => (
                <tr key={index}>
                  <td className={styles.engagementType}>{model.engagementType}</td>
                  <td className={styles.idealFor}>{model.idealFor}</td>
                  <td className={styles.benefits}>{model.benefits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.buttons}>
          <Link href={'/contact-us'}>
            <Button className="primary">{primaryButtonText}</Button>
          </Link>
          <Link href={'/contact-us'}>
          <Button className="primary">{secondaryButtonText}</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
