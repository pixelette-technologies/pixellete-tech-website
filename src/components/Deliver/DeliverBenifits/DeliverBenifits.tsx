import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import React from 'react';
import './deliverbenifits.css';

// Define the Props type for the Cards component
type CardsProps = {
  title1: string;
  description1: string;
  title2: string;
  description2: string;
  title3: string;
  description3: string;
  title4: string;
  description4: string;
};

const OurClients: React.FC = () => {
  return (
    <div className="deliverBenifits">
      <Container className="main">
        <center data-aos-duration="700" data-aos="fade-up">
          <Heading className="primary" id="h_ani">
            Benefits of Complete Development
            <br />
            Outsourcing with Us
          </Heading>
        </center>
        <div data-aos-duration="500" data-aos="fade-up">
          <Cards
            title1="Complete Project Ownership"
            description1="Your project is our responsibility, allowing you to concentrate on other aspects of your business"
            title2="Expert Management"
            description2="Your project is delivered on time and within budget with the help of dedicated project managers"
            title3="Reduced Costs"
            description3="You don’t need to invest in additional infrastructure, tools, talent or management; we handle everything"
            title4="High-Quality Talent Pool"
            description4="You can access our experienced team that delivers fully tested, high-quality products ready for deployment"
          />
        </div>
      </Container>
    </div>
  );
};

const Cards: React.FC<CardsProps> = (props) => {
  return (
    <>
      <div
        className="benefit-line"
        style={{
          width: '80%',
          height: '2px',
          backgroundColor: 'grey',
          margin: '0 auto',
          marginTop: '50px',
        }}
      >
        {[0, 25, 50, 75].map((left, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: 'white',
              left: `${left}%`,
            }}
          />
        ))}
      </div>
      <div className="benifitsCard">
        <div>
          <h1>{props.title1}</h1>
          <p>{props.description1}</p>
        </div>
        <div>
          <h1>{props.title2}</h1>
          <p>{props.description2}</p>
        </div>
        <div>
          <h1>{props.title3}</h1>
          <p>{props.description3}</p>
        </div>
        <div>
          <h1>{props.title4}</h1>
          <p>{props.description4}</p>
        </div>
      </div>
    </>
  );
};

export default OurClients;
