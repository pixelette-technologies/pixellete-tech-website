// import { FiExternalLink } from "react-icons/fi";
// import { Container } from "@/components/Feature/Container/Container";
// import { Heading } from "@/components/Feature/Heading/Heading";
// import { Button } from "@/components/Feature/Button/Button";
// import './casestudies.css'
// import { CaseSlider } from "@/components/Feature/CaseSlider/CaseSlider";

// const images = [
//   '/images/home/CaseSliderImgg.png',
//   '/images/home/CaseSliderImgg.png',
//   '/images/home/CaseSliderImgg.png',
//   '/images/home/CaseSliderImgg.png',
//   '/images/home/CaseSliderImgg.png',
// ];

// const CaseStudies = () => {
//   return (
//     <div className="caseStudySection">
//       <Container className="main margins">
//         <center>
//           <Heading
//             className="secondry"
//             animation="fade-up"
//             duration="500"
//             id="h_ani"
//           >
//          Our past work speaks volumes
//           </Heading>
//           {/* <Link to="/case-studies"> */}
//           <Button className="primary" animation="fade-up" duration="400">
//             <span
//               style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}
//             >
//               View Our Projects
//               <FiExternalLink />
//             </span>
//           </Button>
//           {/* </Link> */}
//         </center>
//         <section>
//           {/* <CaseSlider data={data.caseSliderData} /> */}

//           <CaseSlider data={images} />
//         </section>
//       </Container>
//     </div>
//   );
// };

// export default CaseStudies;



'use client';

import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import { Text } from '@/components/Feature/Text/Text';
import data from '@/data';
import Image from 'next/image';
import React, { useRef } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Slider from 'react-slick';
import { v4 as uuidv4 } from 'uuid';
import './casestudies.css';
import { Card } from '@/components/Feature/CaseSlider/Card';

const images = [
  '/images/home/CaseSliderImgg.png',
  '/images/home/CaseSliderImgg.png',
  '/images/home/CaseSliderImgg.png',
  '/images/home/CaseSliderImgg.png',
  '/images/home/CaseSliderImgg.png',
];


export const CaseStudies = () => {
  const slider = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1424, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1124, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const nextButtonHandler = () => slider?.current?.slickNext();
  const previousButtonHandler = () => slider?.current?.slickPrev();

  return (
    <>
        <Container className="main margins">
          <div className="testimonialSection-background">
            <img
              src="/images/home/testimonials/testimonialBackground.svg"
              alt="Testimonial Background"
            />
          </div>
        </Container>

      <div className="testimonialSection">
        <Container className="main">
          <blockquote>
            <img src="/images/home/testimonials/box_16.svg" alt="Decorative Box" />
          </blockquote>

          <center>
            <Heading className="secondry" animation="fade-up" duration="400" id="h_ani">
            Clients love us
            </Heading>
            <div data-aos-duration="500" data-aos="fade-up">
              <Text className="primary">4.9</Text>
              <Image src="/images/home/stars.svg" alt="Rating Stars" width={100} height={100} />
              <Button className="primary">
                
                  21 Reviews
                  <FiExternalLink />
              </Button>
            </div>
          </center>

          <section>
            <div className="id">
              <Slider ref={slider} {...settings}>
                {images.map((el, index) => (
                  <a key={uuidv4()} href={el.url}>
                    <Card
                    image={el}
                    />
                  </a>
                ))}
              </Slider>
            </div>
          </section>
          <div>
            <Image
              src="/images/home/arrowLeft.svg"
              alt="Previous Arrow"
              width={20}
              height={20}
              onClick={previousButtonHandler}
              data-aos="fade-right"
              data-aos-duration="700"
            />
            <Image
              src="/images/home/arrowRight.svg"
              alt="Next Arrow"
              width={20}
              height={20}
              onClick={nextButtonHandler}
              data-aos="fade-left"
              data-aos-duration="700"
            />
          </div>
        </Container>
      </div>
    </>
  );
};
