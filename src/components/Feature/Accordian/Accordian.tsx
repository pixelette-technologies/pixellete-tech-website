import type { FC } from 'react';
import { motion } from 'framer-motion';
import './accordian.css';
import Image from 'next/image';

type AccordianProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

const Accordian: FC<AccordianProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="accordian" onClick={onClick}>
      <header className="accordian-header">
        <p>{question}</p>
        <div>
        <motion.div
          animate={isOpen ? { rotate: -180 } : { rotate: 0 }}
          className="accordian-toggle-icon"
        >
          <Image
            src={isOpen ? '/images/aiServices/minus.svg' : '/images/aiServices/plus.svg'}
            alt={isOpen ? 'Collapse' : 'Expand'}
            width={20}
            height={20}
          />
        </motion.div>
        </div>
      </header>
      <section className="accordian-content">
        {isOpen && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            className="accordian-answer"
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Accordian;
