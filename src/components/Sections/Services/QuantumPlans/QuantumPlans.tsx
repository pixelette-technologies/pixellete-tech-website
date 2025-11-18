'use client';

import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './quantumplans.css';

type PlanFeature = {
  text: string;
};

type Plan = {
  title: string;
  description: string;
  features: PlanFeature[];
  buttonText?: string;
  buttonLink?: string;
};

type QuantumPlansProps = {
  heading?: string;
  plans?: Plan[];
};

const defaultPlans: Plan[] = [
  {
    title: 'Complete Outsourcing',
    description: 'For organisations seeking full-cycle delivery, from discovery to pilot deployment.',
    features: [
      { text: 'End-to-end management of quantum-AI integrations' },
      { text: 'KPI-driven reporting and benchmarking' },
      { text: 'Hybrid Sweat Equity (HSE) options for co-investment' },
    ],
    buttonText: 'Book a free consultation',
    buttonLink: '/contact-us',
  },
  {
    title: 'Staff Augmentation',
    description: 'For teams seeking specialised technical support or advisory. Includes:',
    features: [
      { text: 'Dedicated AI/blockchain-quantum engineers' },
      { text: 'Technical oversight and sprint integration' },
      { text: 'Continuous knowledge transfer' },
    ],
    buttonText: 'Book a free consultation',
    buttonLink: '/contact-us',
  },
];

export const QuantumPlans: React.FC<QuantumPlansProps> = ({
  heading = 'Select a plan that aligns best with your project development goals',
  plans = defaultPlans,
}) => {
  return (
    <div className="quantumPlansSection">
      <Container className="main margins">
        <div className="quantumPlansHeader">
          <h2>{heading}</h2>
        </div>
        <div className="quantumPlansGrid">
          {plans.map((plan, index) => (
            <div key={index} className="quantumPlanCard">
              <h3>{plan.title}</h3>
              <p className="quantumPlanDescription">{plan.description}</p>
              <ul className="quantumPlanFeatures">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <span className="quantumPlanCheckmark">
                      <Image
                        src="/images/quantumService/bullet.svg"
                        alt="checkmark"
                        width={23}
                        height={16}
                      />
                    </span>
                    {feature.text}
                  </li>
                ))}
              </ul>
              <div className="quantumPlanButton">
                <Link href={plan.buttonLink || '/contact-us'}>
                  <Button className="primary">{plan.buttonText || 'Book a free consultation'}</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
