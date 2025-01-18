import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './caseslider.css';
import { Button } from '../Button/Button';

type CaseStudiCardProps = {
  to: string;
  image: string;
  tags: string[];
  name: string;
  description: string;
};

export const CaseStudiCard: FC<CaseStudiCardProps> = ({ to, image, tags, name, description }) => {
  return (
    <Link href={`/case-studies/${to}`} data-aos="fade-up" data-aos-duration="500">
      {/* <div className="caseStudiSectionCard">
        <figure>
          <Image style={{ width: '50%', margin: '0 auto' }} src="/images/casestudies/CaseSliderCardBanner.svg" alt="Case Studies" width={100} height={100} />
        </figure>
        <div style={{margin: '-2rem 0 3rem 0'}}>
          <p>APIs and launch solutions like Prepaid
            cards, Multi-currency, Charge and Credit
            cards, and Buy Now Pay Later.</p>
        </div>
        </div> */}
      {/* <div className="caseStudiSectionCard">
        <figure>
          <Image src={image} alt="Case Studies" width={300} height={200} />
        </figure>
        <div>
          <header>
            {tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </header>
          <h3 className="blogCardHeading">{name}</h3>
          <p>{description}</p>
        </div>
      </div> */}
      <div className="cardContainer">
        <div className="flipCard">
          {/* Front Side */}
          <div className="cardFront">
            <figure style={{marginTop: '4rem'}}>
              <Image
                style={{ width: '50%', margin: '0 auto' }}
                src="/images/casestudies/CaseSliderCardBanner.svg"
                alt="Case Studies"
                width={100}
                height={100}
              />
            </figure>
            <div style={{alignItems: 'center', display: 'flex', height: '50%'}}>
              <p style={{fontSize: '1.3rem', width: '80%', margin: '0 auto'}}>
                APIs and launch solutions like Prepaid cards, Multi-currency, Charge
                and Credit cards, and Buy Now Pay Later.
              </p>
            </div>
          </div>

          {/* Back Side */}
          <div className="cardBack">
            <figure>
              <Image src={"/images/casestudies/CaseSliderCardHeader.svg"}
                alt="Case Studies" width={300} height={200} />
            </figure>
            <div style={{ margin: '1rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
              {/* <header>
                {tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </header> */}
              <h3 className="blogCardHeading">Smart Contracter</h3>
              <div className='cardBackTags'>
                <p>Banking</p>
                <p>Financial Service</p>
                <p>Fintech</p>
                <p>Payments</p>
              </div>
              <div>
                <Button className="primary" animation="fade-up" duration="2400">
                View Project Details
                </Button>
              </div>
              {/* <p>{description}</p> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
