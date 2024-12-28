'use client';

import { Button } from '@/components/Feature/Button/Button';
import { TestimonialCard } from '@/components/Feature/Cards/TestimonialCard';
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import { Text } from '@/components/Feature/Text/Text';
import data from '@/data';
import Image from 'next/image';
import React, { useRef } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Slider from 'react-slick';
import { v4 as uuidv4 } from 'uuid';
import './testimonial.css';

export const SampleNextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block', background: 'red' }}
    onClick={onClick}
    role="button" // Adds an accessible role
    tabIndex={0} // Makes it focusable with keyboard
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick?.(e); // Calls the onClick handler for Enter or Space key
      }
    }}
    aria-label="Next Slide" // Improves screen reader accessibility
  >
    <Image src="/images/testimonial/arrowRightSlider.png" alt="Next Arrow" />
  </div>
);
export const SamplePrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block', background: 'green' }}
    onClick={onClick}
    role="button" // Adds an accessible role
    tabIndex={0} // Makes it focusable with keyboard
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick?.(e); // Calls the onClick handler for Enter or Space key
      }
    }}
    aria-label="Next Slide" // Improves screen reader accessibility
  >
    <Image src="/images/testimonial/arrowLeftSlider.png" alt="Previous Arrow" />
  </div>
);

export const Testimonial = ({ background }) => {
  const slider = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1424, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1124, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const nextButtonHandler = () => slider?.current?.slickNext();
  const previousButtonHandler = () => slider?.current?.slickPrev();

  return (
    <>
        <Container className="main">
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
                {data.testimonialData.map((el, index) => (
                  <a key={uuidv4()} href={el.url}>
                    <TestimonialCard
                      comment={el.comment}
                      profile={el.user_profile}
                      rating={el.rating}
                      userName={el.user_name}
                      role={el.user_role}
                      animation="fade-up"
                      duration={`${index}00`}
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
