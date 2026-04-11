import { Container } from '@/components/Feature/Container/Container';
import styles from './herosection.module.css';

const HeroSection: React.FC = ({ heading, description }) => {
  return (
    <>
      {/* <Container className="main">
        <div className="heroSection-mobile-background">
          <img
            src="/images/casestudies/heroSectionBackground.svg"
            alt="background"
          />
        </div>
      </Container> */}
      <Container>
        <div className={styles.testimonialSectionBackground}>
          <img
            src="/images/home/testimonials/testimonialBackground.svg"
            alt="Testimonial Background"
            className={styles.backgroundImage}
          />
        </div>
      </Container>
      <div className={styles.heroSectionMobile}>
        <Container className="main">
          {/* <blockquote>
            <img src="/images/casestudies/box_1.svg" alt="box 1" />
            <img src="/images/casestudies/box_2.svg" alt="box 2" />
            <img src="/images/casestudies/box_3.svg" alt="box 3" />
            <img src="/images/casestudies/box_4.svg" alt="box 4" />
          </blockquote> */}
          <center>
            <h1>
              {heading || 'Our development legacy in action'}
            </h1>
            <p>
              {description || '97% customer satisfaction rating  |  4.8 overall Clutch rating  |  30,000+ hours in development'}
            </p>

            {/* <Link href="contactUs">
              <Button className="primary" animation="fade-up" duration="2400">
                Schedule a Consultation
              </Button>
            </Link> */}
          </center>
        </Container>
      </div>
    </>
  );
};

export default HeroSection;
