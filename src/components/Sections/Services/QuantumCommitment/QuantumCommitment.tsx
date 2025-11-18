'use client';

import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import Link from 'next/link';
import React from 'react';
import './quantumcommitment.css';

type Statistic = {
  value: string;
  description: string;
};

type QuantumCommitmentProps = {
  heading?: string;
  description?: string;
  statistics?: Statistic[];
  ctaHeading?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
};

const defaultStatistics: Statistic[] = [
  {
    value: '80%',
    description: 'of pilots completed within 12 weeks',
  },
  {
    value: '£500k+',
    description: 'average pilot value delivered under HSE model',
  },
  {
    value: '10%',
    description: 'continuous improvement efficiency across all optimisation projects',
  },
];

export const QuantumCommitment: React.FC<QuantumCommitmentProps> = ({
  heading = 'Our commitment to excellence',
  description = 'Excellence drives every Pixelette Quantum engagement. We work tirelessly to translate complex technologies into tangible business impact.',
  statistics = defaultStatistics,
  ctaHeading = 'Start your quantum journey',
  ctaDescription = 'Quantum transformation doesn\'t require a laboratory, it requires leadership. Launch your 8-12 week pilot under our Hybrid Sweat Equity model and join the next era of digital innovation.',
  ctaButtonText = 'Consult our experts',
  ctaButtonLink = '/contact-us',
}) => {
  return (
    <div className="quantumCommitmentSection">
      <Container className="main margins">
        <div className="quantumCommitmentHeader">
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
        <div className="quantumCommitmentStats">
          {statistics.map((stat, index) => (
            <div key={index} className="quantumCommitmentStatCard">
              <h3>{stat.value}</h3>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>
        <div className="quantumCommitmentCTA">
          <h2>{ctaHeading}</h2>
          <p>{ctaDescription}</p>
          <div className="quantumCommitmentButton">
            <Link href={ctaButtonLink}>
              <Button className="primary">{ctaButtonText}</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
