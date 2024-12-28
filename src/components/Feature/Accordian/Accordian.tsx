import type { FC } from 'react';
import { motion } from 'framer-motion';
import Text from '../Text/Text';
import './accordian.css';

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
        <Text className="secondry">{question}</Text>
        <motion.div
          animate={isOpen ? { rotate: -180 } : { rotate: 0 }}
          className="accordian-toggle-icon"
        >
          <img
            src={isOpen ? '/images/aiServices/minus.svg' : '/images/aiServices/plus.svg'}
            alt={isOpen ? 'Collapse' : 'Expand'}
          />
        </motion.div>
      </header>
      <section className="accordian-content">
        {isOpen && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            className="accordian-answer"
          >
            <Text className="titory">{answer}</Text>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Accordian;
