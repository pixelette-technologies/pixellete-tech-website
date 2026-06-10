'use client';

import type { FC } from 'react';
import type { Settings } from 'react-slick';
import { Button } from '@/components/Feature/Button/Button';
import { TestimonialCard } from '@/components/Feature/Cards/TestimonialCard';
import { Container } from '@/components/Feature/Container/Container';
import { clutchStats } from '@/data/clutchStats';
import { testimonialData } from '@/data/testimonialData';
import Image from 'next/image';
import { useRef } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Slider from 'react-slick';
import { v4 as uuidv4 } from 'uuid';
import styles from './testimonial.module.css';

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const SampleNextArrow: FC<ArrowProps> = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block', background: 'red' }}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick?.();
      }
    }}
    aria-label="Next Slide"
  >
    <Image src="/images/testimonial/arrowRightSlider.png" alt="Next Arrow" width={20} height={20} />
  </div>
);

export const SamplePrevArrow: FC<ArrowProps> = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block', background: 'green' }}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick?.();
      }
    }}
    aria-label="Previous Slide"
  >
    <Image src="/images/testimonial/arrowLeftSlider.png" alt="Previous Arrow" width={20} height={20} />
  </div>
);

type TestimonialProps = {
  background?: string;
};

export const Testimonial: FC<TestimonialProps> = ({ background }) => {
  const slider = useRef<Slider | null>(null);

  const settings: Settings = {
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
      {/* JSON-LD structured data for Google rich results */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          'name': 'Software Development',
          'description': 'software development services offered by Pixelette Technologies.',
          'provider': {
            '@type': 'Organization',
            '@id': 'https://pixelettetech.com/#organization',
            'name': 'Pixelette Technologies',
          },
          'review': testimonialData.map(el => ({
            '@type': 'Review',
            'author': {
              '@type': 'Person',
              'name': el.user_name,
            },
            'reviewRating': {
              '@type': 'Rating',
              'ratingValue': el.rating.toString(),
              'bestRating': '5',
            },
            'reviewBody': el.comment,
            'datePublished': '2023-01-01',
            'url': el.url,
          })),
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': clutchStats.ratingValue.toFixed(1),
            'reviewCount': String(clutchStats.reviewCount),
            'bestRating': '5',
            'worstRating': '3',
          },
        })}
      </script>

      {/* <Container> */}
      {/* <div className={styles.testimonialSectionBackground}>
          <img
            src="/images/home/testimonials/testimonialBackground.svg"
            alt="Testimonial Background"
            className={styles.backgroundImage}
          />
        </div> */}
      {/* </Container> */}

      <div className={styles.testimonialSection}>
        <Container className={styles.main}>
          <blockquote>
            <Image
              src="/images/home/testimonials/box_16.svg"
              alt="Decorative Box"
              width={50}
              height={50}
            />
          </blockquote>

          <center>
            <h2 style={{ marginBottom: '2rem' }}>
              Clients ♥️ us
            </h2>
            <div // data-aos-duration="500" data-aos="fade-up"
            >
              <p>{clutchStats.ratingValue.toFixed(1)}</p>
              <Image
                src="/images/home/stars.svg"
                alt="Rating Stars"
                width={100}
                height={100}
              />
              <Button className="primary">
                {`${clutchStats.reviewCount} Reviews`}
                <FiExternalLink />
              </Button>
            </div>
          </center>

          <section>
            <div className={styles.sliderContainer}>
              <Slider className={styles.slickSlider} ref={slider} {...settings}>
                {testimonialData.map((el, index) => (
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
          <div className={styles.arrows}>
            <Image
              src="/images/home/arrowLeft.svg"
              alt="Previous Arrow"
              width={20}
              height={20}
              onClick={previousButtonHandler}
              // data-aos="fade-right"
              // data-aos-duration="700"
            />
            <Image
              src="/images/home/arrowRight.svg"
              alt="Next Arrow"
              width={20}
              height={20}
              onClick={nextButtonHandler}
              // data-aos="fade-left"
              // data-aos-duration="700"
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Testimonial;
