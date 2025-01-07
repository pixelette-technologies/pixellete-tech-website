import { Container } from '@/components/Feature/Container/Container';
import Text from '@/components/Feature/Text/Text';
import PropTypes from 'prop-types';
import './startupstats.css';

type StartupStatsProps = {
  heading?: string;
  text?: string;
};

const StartupStats: React.FC<StartupStatsProps> = () => {
  return (
    <>
      <Container className="main">
        <div className="specialSection-background">
          <img
            src="/images/Clutch/howWeWorkBackground.svg"
            alt="background"
          />
        </div>
      </Container>
      <div className="specialSection">
        <Container className="main margins">
          <section>
            <div className="award-text-wrapper">
              <div className="vertical-bar"></div>
              <div className="award-text">
                <h1
                  id="h_ani"
                >
                  <>
                    <span className="percentage">95%</span>
                    {' '}
                    <br />
                    {' '}
                    of startup
                    ideas
                    {' '}
                    <br />
                    never get to
                    {' '}
                    <br />
                    {' '}
                    market
                  </>
                </h1>
              </div>
            </div>
              <>
                <span className="stats-text">
                  And it&apos;s a real setback, because these ideas have the
                  <br />
                  potential to revolutionise industries and solve real-world
                  <br />
                  problems. Here&apos;s why it happens:
                  <br />
                  <br />
                  <div className="list-container">
                    <ul className="ul-stats">
                      <li>
                        <strong>Technical barriers:</strong>
                        {' '}
                        Many founders,
                        while solid on the
                        <br />
                        business end, lack the technical expertise needed to
                        build
                        {' '}
                        <br />
                        their vision
                      </li>
                      <li>
                        <strong>Resource strain:</strong>
                        {' '}
                        Hiring and managing
                        developers can be
                        <br />
                        prohibitively expensive and time-consuming.
                      </li>
                      <li>
                        <strong>Quality issues:</strong>
                        {' '}
                        Low-cost solutions
                        often fail to deliver the
                        <br />
                        quality and functionality needed for success.
                      </li>
                    </ul>
                  </div>
                </span>
              </>
              <br />
              <br />
            
          </section>
          <center className="center-text">
            <p>
              The consequences are significant, valuable ideas remain
              unrealised, and market gaps go unfilled, potential
              <br />
              {' '}
              profits slip away as projects stall or fail to meet market
              standards and founders experience ongoing stress and
              <br />
              {' '}
              setbacks, delaying their path to success.
              </p>
            <div
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginTop: '3rem',
                wordSpacing: '0.2rem',
              }}
            >
              That&apos;s why we can help you out. Just look at our track
              record!
            </div>
          </center>
        </Container>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

StartupStats.defaultProps = {
  heading: '',
  text: '',
};

StartupStats.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
};

export default StartupStats;
