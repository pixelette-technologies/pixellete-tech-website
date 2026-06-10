import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image'; // Import Next.js Image component
import './whatmakeusspecial.css';

const WhatMakeUsSpecialHome: React.FC = () => {
  return (
    <>
      <Container className="main">
        <div style={{ position: 'relative' }}>
          <div className="red-background-border"></div>
          {/* <img loading="lazy" src='/images/home' alt="background" /> */}
          {/* <img loading="lazy" src={assets.home.aboutRightBackground} alt="background" /> */}
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
                src="/images/Clutch/clutch-badges/business-form/manifest-ai-company-pak.png"
                alt="Manifest — Top AI Company Pakistan"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src="/images/Clutch/clutch-badges/business-form/most-reviewed-blockchain-company.png"
                alt="Clutch — Most Reviewed Blockchain Company"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src="/images/Clutch/clutch-badges/business-form/most-reviewed-app-development-company.png"
                alt="Clutch — Most Reviewed App Development Company"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src="/images/Clutch/clutch-badges/business-form/top-decentralized-finance-company-2025.png"
                alt="Clutch — Top Decentralized Finance Company 2025"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src="/images/Clutch/clutch-badges/business-form/top-machine-learning-company-2025.png"
                alt="Clutch — Top Machine Learning Company 2025"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src="/images/Clutch/clutch-badges/business-form/top-ar-core-development-2025.png"
                alt="Clutch — Top AR Core Development 2025"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={200}
                height={200}
              />
              <Image
                src="/images/Clutch/clutch-badges/business-form/top-generative-ai-company-2023.png"
                alt="Clutch — Top Generative AI Company 2023"
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
                alt="ProvenExpert Partner"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/pclutch.png"
                alt="Clutch — Verified Reviews Profile"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/goodfirms.png"
                alt="GoodFirms Partner"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/manifestbadge.png"
                alt="The Manifest — Top Listed Company"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/elementor.png"
                alt="Elementor Partner"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/oracle.png"
                alt="Oracle Partner"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/awspartner.png"
                alt="AWS Partner"
                // data-aos="fade-up"
                // data-aos-duration="600"
                width={183}
                height={55}
              />
              <Image
                src="/images/home/awardpartnerships/silverpartner.png"
                alt="Microsoft Silver Partner"
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
