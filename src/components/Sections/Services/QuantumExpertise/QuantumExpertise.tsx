'use client';

import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import React from 'react';
import './quantumexpertise.css';

type ExpertiseItem = {
  icon: string;
  title: string;
};

type QuantumExpertiseProps = {
  heading?: string;
  description?: string;
  subHeading?: string;
  expertiseItems?: ExpertiseItem[];
  conclusion?: string;
};

const defaultExpertiseItems: ExpertiseItem[] = [
  {
    icon: '/images/quantumService/quantum_safe.svg',
    title: 'Quantum-Safe Blockchain Integration',
  },
  {
    icon: '/images/quantumService/quantum_optimization.svg',
    title: 'AI & Quantum Optimisation Frameworks',
  },
  {
    icon: '/images/quantumService/pilot.svg',
    title: 'Data-Driven Pilot Deployment',
  },
  {
    icon: '/images/quantumService/ethical.svg',
    title: 'Governance & Ethical AI Alignment',
  },
];

export const QuantumExpertise: React.FC<QuantumExpertiseProps> = ({
  heading = 'Our quantum service expertise',
  description = 'Pixelette Quantum combines advanced R&D with applied engineering to make next-generation computing commercially viable.',
  subHeading = 'Our expertise covers:',
  expertiseItems = defaultExpertiseItems,
  conclusion = 'We integrate leading cloud-based quantum platforms such as IBM Quantum, AWS Braket, Quantinuum, and D-Wave to deliver secure, measurable innovation.',
}) => {
  return (
    <div className="quantumExpertiseSection">
      <Container className="main margins">
        <div className="quantumExpertiseHeader">
          <h2>{heading}</h2>
          <p className="quantumExpertiseIntro">{description}</p>
          <p className="quantumExpertiseSubHeading">{subHeading}</p>
        </div>
        <div className="quantumExpertiseGrid">
          {expertiseItems.map((item, index) => (
            <div key={index} className="quantumExpertiseCard">
              <div className="quantumExpertiseIcon">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={50}
                  height={50}
                />
              </div>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
        <div className="quantumExpertiseConclusion">
          <p
            dangerouslySetInnerHTML={{
              __html: conclusion.replace(
                'cloud-based quantum platforms',
                '<strong>cloud-based quantum platforms</strong>',
              ),
            }}
          />
        </div>
      </Container>
    </div>
  );
};
