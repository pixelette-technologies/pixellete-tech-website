import React from 'react';
import './index.css';

type HowWeWorkProps = object;

const data = [
  {
    title: 'Discovery Call',
    desc: 'We start with a deep-dive discovery call to understand your unique goals, challenges, and vision.',
  },
  {
    title: 'Proposal',
    desc: 'Next, we craft a tailored strategy and proposal. Every step, from tech stack to timelines, is mapped out.',
  },
  {
    title: 'Execution',
    desc: 'With a well-defined plan in place, our expert team moves into action. Using agile methods, we build, test, and refine, keeping you engaged every step of the way.',
  },
  {
    title: 'Evaluation and Maintenance',
    desc: 'Post-launch, we rigorously evaluate performance and provide ongoing support for any of your growing needs',
  },
];

export const HowWeWork: React.FC<HowWeWorkProps> = () => {
  return (
    <div style={{ margin: '5rem 0', padding: '10rem 0' }} className="howWeWorkBg">
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', justifyContent: 'center' }}>
          <div
            className="howWeWorkTextAlign"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <h2>How we work</h2>
            {/* <p>
              {' '}
              We understand each client’s needs are unique, and we bring a
              <br />
              flexible, responsive approach to every project.
            </p> */}
            <p>
              We understand each client’s needs are unique, and we bring a
              <br />
              flexible, responsive approach to every project. With structured
              <br />
              methodologies and the agility to adapt, we stay on the pulse
              <br />
              of trends, providing you with tech and IT services that are not
              <br />
              just relevant today but remain future-proof.
            </p>
          </div>
          <div className="expertiseGrid">
            <section className="HowWeWorkCards">
              {data.map((el, index) => (
                <div key={index}>
                  <h4>{index + 1}</h4>
                  <h3>{el.title}</h3>
                  <br />
                  <p>{el.desc}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
