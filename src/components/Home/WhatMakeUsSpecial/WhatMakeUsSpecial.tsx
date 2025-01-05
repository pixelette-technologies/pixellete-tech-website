import { Container } from "@/components/Feature/Container/Container";
import { Heading } from "@/components/Feature/Heading/Heading";
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
            <Heading className="primary">Our awards</Heading>
            <br />
            <br />
            <div>
              <Image
                src='/images/home/clutch.png'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={200} // Add a width to the image
                height={200} // Add a height to the image
              />
              <Image
                src='/images/home/computervision.png'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src='/images/home/clutch.png'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src='/images/home/aicompany.png'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src='/images/home/clutch.png'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className="specialImgs1">
            <Heading className="primary">Our partnerships</Heading>
            <br />
            <br />
            <br />
            <div>
              <Image
                src='/images/home/Partnership1.svg'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src='/images/home/Partnership2.svg'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src='/images/home/Partnership3.svg'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src='/images/home/Partnership4.svg'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src='/images/home/Partnership5.svg'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src='/images/home/Partnership6.svg'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                style={{ width: "50px" }}
                src='/images/home/Partnership7.svg'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={50}
                height={50}
              />
              <Image
                src='/images/home/Partnership8.svg'
                alt="heroImage"
                data-aos="fade-up"
                data-aos-duration="600"
                width={200}
                height={200}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WhatMakeUsSpecialHome;
