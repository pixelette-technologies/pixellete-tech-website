import { Button } from '@/components/Feature/Button/Button';
import Link from 'next/link';
import React from 'react';
import styles from './calltoaction.module.css';

type CallToActionProps = {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

export const CallToAction: React.FC<CallToActionProps> = ({
  heading,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <center>
      <div className={styles.container}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.description}>{description}</p>
        <Link href={buttonLink} className={styles.buttonLink}>
          <Button className="primary">{buttonText}</Button>
        </Link>
      </div>
    </center>
  );
};
