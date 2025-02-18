import { Container } from '../../Feature/Container/Container'; // Simplified import
import YourPlanCard from './YourPlanCard';
import './cards.css';

export const YourPlanCardGrid = ({ heading, text, data }) => {
  return (
    <div className="yourPlanCardGrid" id='sideMargin'>
      <Container className="main margins">
        <h2
        >
          {heading}
        </h2>
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
