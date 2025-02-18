import { YourPlanCardGrid } from '@/components/Feature/Cards/YourPlanCardGrid';
import { Container } from '@/components/Feature/Container/Container';
import { yourPlanData } from '@/data/yourPlanData';
import Image from 'next/image';
import React from 'react';
import styles from './yourplan.module.css';

type OurYourPlanProps = object;

export const YourPlan: React.FC<OurYourPlanProps> = () => {
  return (
    <div className={styles.ourPlanContainer}>
      <Container className="main margins">
        <blockquote>
          <Image src="/images/home/services/box_10.svg" alt="box" width={100} height={100} />
          <Image src="/images/home/services/box_11.svg" alt="box" width={100} height={100} />
        </blockquote>
      </Container>
      <YourPlanCardGrid
        heading="Choose an engagement model that adapts to your needs"
        text="Every project is unique, and so are our solutions. All you’ve got to do is select a plan that best aligns with your goals, let us know and we’ll help bring your project to life."
        data={yourPlanData}
      />
    </div>
  );
};
