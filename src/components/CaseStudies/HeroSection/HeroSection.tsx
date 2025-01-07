import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import Text from '@/components/Feature/Text/Text';
import Link from 'next/link';
import './herosection.css';

const HeroSection: React.FC = () => {
  return (
    <>
      <Container className="main">
        <div className="heroSection-mobile-background">
          <img
            src="/images/casestudies/heroSectionBackground.svg"
            alt="background"
          />
        </div>
      </Container>
      <div className="heroSection-mobile">
        <Container className="main">
          <blockquote>
            <img src="/images/casestudies/box_1.svg" alt="box 1" />
            <img src="/images/casestudies/box_2.svg" alt="box 2" />
            <img src="/images/casestudies/box_3.svg" alt="box 3" />
            <img src="/images/casestudies/box_4.svg" alt="box 4" />
          </blockquote>
          <center>
            <h1
            >
              Our development legacy in action
            </h1>
             <p>
             Witness our strategies, execution and results unfold in our IT and
             tech development case studies.
             </p>
            
            <Link href="contactUs">
              <Button className="primary" animation="fade-up" duration="2400">
                Schedule a Consultation
              </Button>
            </Link>
          </center>
        </Container>
      </div>
    </>
  );
};

export default HeroSection;
