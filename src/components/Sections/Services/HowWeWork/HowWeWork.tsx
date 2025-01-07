import { Container } from '@/components/Feature/Container/Container';
import Text from '@/components/Feature/Text/Text';
import React from 'react';
import './index.css';

type HowWeWorkProps = {
  // Define any props here if needed in the future
};

const data = [
  {
    title: 'Discovery Call',
    desc: 'We start with a deep-dive discovery call to understand your unique goals, challenges, and vision.',
  },
  {
    title: 'Execution',
    desc: 'With a well-defined plan in place, our expert team moves into action. Using agile methods, we build, test, and refine, keeping you engaged every step of the way.',
  },
  {
    title: 'Proposal',
    desc: 'Next, we craft a tailored strategy and proposal. Every step, from tech stack to timelines, is mapped out.',
  },
  {
    title: 'Evaluation and Maintenance',
    desc: 'Post-launch, we rigorously evaluate performance and provide ongoing support for any of your growing needs',
  },
];

export const HowWeWork: React.FC<HowWeWorkProps> = () => {
  return (
    <div style={{ margin: '5rem 0' }} className="howWeWorkBg">
      <Container className="main margins">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          <div
            className="howWeWorkTextAlign"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <h2>How we work</h2>
            <p>              We understand each client’s needs are unique, and we bring a
              <br />
              flexible, responsive approach to every project.
</p>
            
          </div>
          <div className="expertiseGrid">
            <section className="HowWeWorkCards">
              {data.map((el, index) => (
                <div style={{ margin: '0 1rem' }} key={index}>
                   <p>{el.title}</p>
                  <br />
                  <p>{el.desc}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
};
