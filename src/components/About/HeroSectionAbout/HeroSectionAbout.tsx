import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
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
              <h1>
                Leading Innovation in AI and Blockchain
              </h1>
              <p>
                We’re on a mission to empower businesses with groundbreaking
                solutions that reshape the digital world as we know it.
              </p>

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
