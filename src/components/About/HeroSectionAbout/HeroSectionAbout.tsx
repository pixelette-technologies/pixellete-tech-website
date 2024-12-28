import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
import Link from 'next/link';
import './herosectionabout.css';

const HeroSectionAbout: React.FC = () => {
  return (
    <>
      <Container className="main">
        <div className="heroSectionAbout-background">
          <img src="/images/about/heroBackground.svg" alt="background" />
        </div>
      </Container>

      <div className="heroSectionAbout">
        <Container className="main margins">
          <center>
            <header>
              <Heading
                className="secondry"
                animation="zoom-out"
                duration="300"
              >
                Leading Innovation in AI and Blockchain
              </Heading>
              <Text className="primary" animation="zoom-in" duration="500">
                We’re on a mission to empower businesses with groundbreaking
                solutions that reshape the digital world as we know it.
              </Text>
              <div className="buttonpad"></div>
              <Link href="contactUs">
                <Button className="primary">
                  Get in Touch and Explore Our Journey
                </Button>
              </Link>
            </header>
          </center>
        </Container>
      </div>
    </>
  );
};

export default HeroSectionAbout;
