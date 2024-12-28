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
          <Heading
            className="secondry"
            animation="fade-up"
            duration="300"
            id="h_ani"
          >
            {heading}
          </Heading>
          <Text className="secondry" animation="fade-up" duration="500">
            {text}
          </Text>
        </center>
        <section>
          <ServicesCard data={data} />
        </section>
      </Container>
    </div>
  );
};
