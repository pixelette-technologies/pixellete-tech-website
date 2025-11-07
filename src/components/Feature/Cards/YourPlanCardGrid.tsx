import { Container } from '../../Feature/Container/Container'; // Simplified import
import YourPlanCard from './YourPlanCard';
import './cards.css';

export const YourPlanCardGrid = ({ heading, text, data }) => {
  return (
    <div className="yourPlanCardGrid" id="sideMargin">
      <Container className="main margins">
        <h2 className="sm-text-center">
          {heading}
        </h2>
        <br />
        <p className="sm-text-center">
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
