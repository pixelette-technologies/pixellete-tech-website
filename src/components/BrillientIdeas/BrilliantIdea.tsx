import { Container } from '../Feature/Container/Container';
import './brillientideas.css';

const BrilliantIdea: React.FC = () => {
  return (
    <>
      <Container className="main">
        <div className="specialSection-background">
          <img src="/images/Clutch/howWeWorkBackground.svg" alt="background" />
        </div>
      </Container>
      <div className="specialSection">
        <Container className="main margins">
          <section id="sideMargin">
            <div className="award-text">
              <h1
                id="h_ani"
              >
                <>
                  Shipped 200+
                  {' '}
                  <br />
                  tech projects and
                  <br />
                  {' '}
                  counting
                </>
              </h1>
              <br />
              {' '}
              <br />
              <>
                <ul className="project-deilvered">
                  <li>35,000+ hours in development</li>
                  <li>1,000,000,00+ project visitors garnered</li>
                  <li>100% project completion success rate</li>
                  <li>Secured over £100M in funding through MVPs</li>
                </ul>
              </>

            </div>
            <img src="/images/Clutch/mind.png" alt="Mind Map" />
          </section>
        </Container>
      </div>
    </>
  );
};

export default BrilliantIdea;
