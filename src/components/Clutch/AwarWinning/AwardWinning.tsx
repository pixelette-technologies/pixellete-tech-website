import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
import PropTypes from 'prop-types';
import AwardCards from './AwardCards';
import './index.css';

const AwardWinning = () => {
  return (
    <>
      <Container className="main">
        <div className="specialSection-background">
          <img src="/images/Clutch/howWeWorkBackground.svg" alt="background" />
        </div>
      </Container>
      <div className="specialSection">
        <Container className="main margins">
          <section>
            <div className="award-text">
              <Heading
                className="secondry"
                animation="fade-up"
                duration="400"
                id="h_ani"
              >
                <>
                  Bagged awards,
                  {' '}
                  <br />
                  accreditations
                  {' '}
                  <br />
                  and partnerships
                  <p
                    style={{
                      marginTop: '1.5rem',
                      fontSize: '2rem',
                      lineHeight: '3rem',
                      fontWeight: '200',
                    }}
                  >
                    Signifying our commitment to client
                    <br />
                    {' '}
                    satisfaction and quality standards.
                  </p>
                </>
              </Heading>
              {/* <div>
                {(data || []).map((el, index) => (
                  <Item key={index} heading={el.heading} text={el.text} />
                ))}
              </div> */}
              <div></div>
            </div>
            <AwardCards />
          </section>
        </Container>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

AwardWinning.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ),
};

const Item = ({ heading, text }) => {
  return (
    <>
      <div>
        <section>
          <img src="/images/Clutch/dot.svg" alt="dot" />
        </section>
        <div>
          <Text className="primary--bold">{heading}</Text>
          <Text className="titory--bold">{text}</Text>
        </div>
      </div>
    </>
  );
};

Item.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default AwardWinning;
