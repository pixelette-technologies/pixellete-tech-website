import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image'; // Import Next.js Image component
import './whatmakeusspecial.css';

const WhatMakeUsSpecialHome: React.FC = () => {
  return (
    <>
      <Container className="main">
        <div className="aboutUsSection-background">
          {/* <img src='/images/home' alt="background" /> */}
          {/* <img src={assets.home.aboutRightBackground} alt="background" /> */}
        </div>
      </Container>
      <Container className="main margins">
        <div className="mainSpecialImgs">
          <div className="specialImgs">
            <h2>Our awards</h2>
            <br />
            <br />
            <div>
              <Image
                src="/images/home/clutch.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={200} // Add a width to the image
                height={200} // Add a height to the image
              />
              <Image
                src="/images/home/computervision.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src="/images/home/clutch.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src="/images/home/awardpartnerships/designrush.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src="/images/home/clutch.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className="specialImgs1">
            <h2>Our partnerships</h2>
            <br />
            <br />
            <br />
            <div>
              <Image
                src="/images/home/awardpartnerships/provenexpert.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/pclutch.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/goodfirms.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/themanifes.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/elementor.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/oracle.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/awspartner.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/silverpartner.png"
                alt="heroImage"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WhatMakeUsSpecialHome;
