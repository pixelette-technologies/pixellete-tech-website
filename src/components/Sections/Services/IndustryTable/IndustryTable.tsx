'use client';

import { Container } from '@/components/Feature/Container/Container';
import React from 'react';
import './industrytable.css';

type IndustryRow = {
  industry: string;
  focus: string;
  impact: string;
};

type IndustryTableProps = {
  heading?: string;
  description?: string;
  industries?: IndustryRow[];
};

const defaultIndustries: IndustryRow[] = [
  {
    industry: 'Finance',
    focus: 'Hybrid AI-Quantum optimisation',
    impact: 'Improved decision accuracy',
  },
  {
    industry: 'Healthcare',
    focus: 'AI-assisted quantum simulations',
    impact: 'Faster discovery & data trust',
  },
  {
    industry: 'Government & Public Sector',
    focus: 'PQC readiness & blockchain resilience',
    impact: 'Strengthened digital infrastructure',
  },
];

export const IndustryTable: React.FC<IndustryTableProps> = ({
  heading = 'Technology for every industry, success for every client',
  description = 'Our quantum-powered AI and blockchain solutions are tailored for high-impact sectors.',
  industries = defaultIndustries,
}) => {
  return (
    <div className="industryTableSection">
      <Container className="main margins">
        <div className="industryTableHeader">
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
        <div className="industryTableContainer">
          <div className="industryTableWrapper">
            <table className="industryTable">
              <thead>
                <tr>
                  <th>Industry</th>
                  <th>Focus</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                {industries.map((row, index) => (
                  <tr key={index}>
                    <td>{row.industry}</td>
                    <td>{row.focus}</td>
                    <td>{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};
