import { Container } from '../../Feature/Container/Container'; // Simplified import
import { Heading } from '../../Feature/Heading/Heading'; // Simplified import
import { Text } from '../../Feature/Text/Text'; // Simplified import
import YourPlanCard from './YourPlanCard';
import './cards.css';

export const YourPlanCardGrid = ({ heading, text, data }) => {
  return (
    <div className="yourPlanCardGrid">
      <Container className="main margins">
          <Heading
            className="secondry"
            animation="fade-up"
            duration="300"
            id="h_ani"
          >
            {heading}
          </Heading>
          <br />
          <Text className="secondry" animation="fade-up" duration="500">
            {text}
          </Text>
          <br />
        <br />
        <section>
          <YourPlanCard data={data} />
        </section>
      </Container>
    </div>
  );
};
