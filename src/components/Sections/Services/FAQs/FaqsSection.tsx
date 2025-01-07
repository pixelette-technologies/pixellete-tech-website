'use client';

import Accordian from '@/components/Feature/Accordian/Accordian';
import { Container } from '@/components/Feature/Container/Container';
import React, { useState } from 'react';
import './index.css';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqsSectionProps = {
  heading?: React.ReactNode;
  text?: string;
  faqs: FaqItem[];
};

const FaqsSection: React.FC<FaqsSectionProps> = ({ heading, text, faqs }) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const splitIndex = Math.ceil(faqs.length / 2);
  const faqsLeft = faqs.slice(0, splitIndex);
  const faqsRight = faqs.slice(splitIndex);

  return (
    <div className="faqsSection">
      <center>
        <h1 id="h_ani">
          {heading || 'Have questions? We\'ve got answers! Here are the most frequent ones'}
        </h1>
        <p>
          {text || 'Ask everything you need to know about our products and services.'}
        </p>

      </center>
      <Container className="main margins">
        <section>
          <div>
            {faqsLeft.map((el, index) => (
              <Accordian
                key={`faq-left-${index}`}
                question={el.question}
                answer={el.answer}
                isOpen={openAccordion === index}
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
              />
            ))}
          </div>
          <div>
            {faqsRight.map((el, index) => (
              <Accordian
                key={`faq-right-${index}`}
                question={el.question}
                answer={el.answer}
                isOpen={openAccordion === splitIndex + index}
                onClick={() => setOpenAccordion(openAccordion === splitIndex + index ? null : splitIndex + index)}
              />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default FaqsSection;
