import type { FC } from 'react';
import { Container } from '../../Feature/Container/Container';
import { Heading } from '../../Feature/Heading/Heading';
import { Text } from '../../Feature/Text/Text';
import ServicesCard from './ServicesCard';
import './cards.css';

type CardSectionGridProps = {
  heading: string;
  text: string;
  data: any[]; // Adjust the type according to the structure of your `data`
};

export const CardSectionGrid: FC<CardSectionGridProps> = ({ heading, text, data }) => {
  return (
    <div className="cardSectionGrid">
      <Container className="main margins">
        <center>
          <h1
            id="h_ani"
          >
            {heading}
          </h1>
          <p>
          {text}
          </p>
          
        </center>
        <section>
          <ServicesCard data={data} />
        </section>
      </Container>
    </div>
  );
};
