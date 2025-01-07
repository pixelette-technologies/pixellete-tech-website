import { Container } from '../../Feature/Container/Container'; // Simplified import
import YourPlanCard from './YourPlanCard';
import './cards.css';

export const YourPlanCardGrid = ({ heading, text, data }) => {
  return (
    <div className="yourPlanCardGrid">
      <Container className="main margins">
        <h1
          id="h_ani"
        >
          {heading}
        </h1>
        <br />
        <p>
          {text}
        </p>
        <br />
        <br />
        <section>
          <YourPlanCard data={data} />
        </section>
      </Container>
    </div>
  );
};
