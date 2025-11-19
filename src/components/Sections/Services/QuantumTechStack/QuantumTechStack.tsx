'use client';

import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import React from 'react';
import './quantumtechstack.css';

type TechItem = {
  name: string;
  icon: string;
};

type QuantumTechStackProps = {
  heading?: string;
  description?: string;
  technologies?: TechItem[];
};

const defaultTechnologies: TechItem[] = [
  { name: 'IBM Q', icon: '/images/quantumService/ibm.svg' },
  { name: 'AWS Braket', icon: '/images/quantumService/aws.svg' },
  { name: 'QUANTINUUM', icon: '/images/quantumService/Quantinuum.svg' },
  { name: 'D:wave', icon: '/images/quantumService/Dwave.svg' },
  { name: 'TensorFlow', icon: '/images/quantumService/TensorFlow.svg' },
  { name: 'PyTorch', icon: '/images/quantumService/pytorch.svg' },
  { name: 'Qiskit', icon: '/images/quantumService/qiskit.svg' },
  { name: 'pennylane', icon: '/images/quantumService/pennylane.svg' },
  { name: 'Ethereum', icon: '/images/quantumService/ethereum.svg' },
  { name: 'polygon', icon: '/images/quantumService/polygon.svg' },
  { name: 'HYPERLEDGER', icon: '/images/quantumService/hyperledger.svg' },
  { name: 'Solana', icon: '/images/quantumService/solana.svg' },
];

export const QuantumTechStack: React.FC<QuantumTechStackProps> = ({
  heading = 'Our tech stack',
  description = 'Our implementations draw upon leading-edge platforms and frameworks.',
  technologies = defaultTechnologies,
}) => {
  return (
    <div className="quantumTechStackSection">
      <Container className="main margins">
        <div className="quantumTechStackHeader">
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
        <div className="quantumTechStackGrid">
          {technologies.map((tech, index) => (
            <div key={index} className="quantumTechStackCard">
              <Image
                src={tech.icon}
                alt={tech.name}
                width={98}
                height={32}
                className="quantumTechStackIcon"
              />
              {/* <span className="quantumTechStackName">{tech.name}</span> */}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
