import type { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './accordian.module.css'; // Import CSS module

type AccordianProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  list: string[];
};

const Accordian: FC<AccordianProps> = ({ question, answer, isOpen, onClick, list }) => {
  return (
    <div className={styles.accordian} onClick={onClick}>
      <header className={styles.accordianHeader}>
        <p>{question}</p>
        <div>
          <motion.div
            animate={isOpen ? { rotate: -180 } : { rotate: 0 }}
            className={styles.accordianToggleIcon}
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
      <section className={styles.accordianContent}>
        {isOpen && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            className={styles.accordianAnswer}
          >
            <p>{answer}</p>
            {list && <ul>
              {list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Accordian;
