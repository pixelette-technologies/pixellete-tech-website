'use client';

import { Container } from '@/components/Feature/Container/Container';
import React from 'react';
import './quantumfeatures.css';

type Feature = {
  title: string;
  description: string;
  icon?: string;
};

type QuantumFeaturesProps = {
  heading?: string;
  description?: string;
  features?: Feature[];
};

const defaultFeatures: Feature[] = [
  {
    title: 'Quantum Algorithm Development',
    description: 'We design and implement cutting-edge quantum algorithms that leverage quantum superposition and entanglement to solve complex optimization, search, and factorization problems exponentially faster than classical computers.',
  },
  {
    title: 'Quantum Circuit Optimization',
    description: 'Our team specializes in optimizing quantum circuits to minimize gate counts, reduce error rates, and maximize computational efficiency across various quantum computing platforms and hardware architectures.',
  },
  {
    title: 'Quantum Machine Learning',
    description: 'We develop quantum machine learning models that process and analyze large datasets using quantum computing principles, enabling faster training, more accurate predictions, and breakthrough insights in AI applications.',
  },
  {
    title: 'Quantum Cryptography',
    description: 'Our quantum cryptography solutions provide unbreakable security through quantum key distribution protocols and quantum-resistant encryption methods, ensuring future-proof data protection against quantum computing threats.',
  },
  {
    title: 'Quantum Simulation',
    description: 'We create advanced quantum simulation systems that model complex quantum systems, molecular structures, and chemical reactions, enabling breakthroughs in drug discovery, materials science, and quantum physics research.',
  },
  {
    title: 'Quantum Cloud Computing',
    description: 'Our quantum cloud computing services provide seamless access to quantum computing resources through cloud platforms, making quantum computing accessible and scalable for businesses of all sizes.',
  },
];

export const QuantumFeatures: React.FC<QuantumFeaturesProps> = ({
  heading = 'Why Choose Our Quantum Computing Solutions',
  description = 'We deliver cutting-edge quantum computing applications that solve complex problems beyond the reach of classical computers. Our comprehensive quantum development services combine innovation with practical business solutions.',
  features = defaultFeatures,
}) => {
  return (
    <div className="quantumFeaturesSection">
      <Container className="main margins">
        <div className="quantumFeaturesHeader">
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
        <div className="quantumFeaturesGrid">
          {features.map((feature, index) => (
            <div key={index} className="quantumFeatureCard">
              <div className="quantumFeatureIcon">
                {feature.icon
                  ? (
                      <img loading="lazy" src={feature.icon} alt={feature.title} />
                    )
                  : (
                      <div className="quantumFeatureIconPlaceholder">
                        <span>{index + 1}</span>
                      </div>
                    )}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
