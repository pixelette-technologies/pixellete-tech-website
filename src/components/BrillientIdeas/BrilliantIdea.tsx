import { Container } from '../Feature/Container/Container';
import Image from 'next/image';
import './brillientideas.css';

const BrilliantIdea: React.FC = () => {
  return (
    <>
      <Container className="main">
        <div className="specialSection-background">
          <img loading="lazy" src="/images/Clutch/howWeWorkBackground.svg" alt="background" />
        </div>
      </Container>
      <div className="specialSection">
        <Container className="main margins">
          <section id="sideMargin">
            <div className="award-text">
              <h2
                id="h_ani"
                className="display-h1"
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
              </h2>
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
            <Image src="/images/Clutch/mind.png" alt="Mind Map" width={566} height={503} style={{ height: 'auto' }} />
          </section>
        </Container>
      </div>
    </>
  );
};

export default BrilliantIdea;
