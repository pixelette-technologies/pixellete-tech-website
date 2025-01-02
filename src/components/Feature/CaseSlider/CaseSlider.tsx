'use client';
import type { FC } from 'react';
import Image from 'next/image';
import { useRef } from 'react';
import Slider from 'react-slick';
import { v4 as uuidv4 } from 'uuid';
import { Card } from './Card';
import './caseslider.css';

type CaseSliderProps = {
  data: {
    fields: {
      image?: { fields: { file: { url: string } } };
      tags?: string;
      shortDescription?: string;
      longDescription?: string;
    };
    sys?: { id: string };
  }[];
};

export const CaseSlider: FC<CaseSliderProps> = ({ data }) => {
  const slider = useRef<Slider | null>(null);

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
  };

  const nextButtonHandler = () => slider.current?.slickNext();
  const previousButtonHandler = () => slider.current?.slickPrev();

  return (
    <div className="caseSlider">
      <section>
        <Slider ref={slider} {...settings}>
          {data && data.map(el => (
            <Card
              key={uuidv4()}
              id={uuidv4()}
              image={el} // Pass the absolute image URL
            // blockChainLink={el.fields?.tags || ''}
            // name={el.fields?.shortDescription || ''}
            // description={el.fields?.longDescription || ''}
            />
          ))}
        </Slider>

      </section>

      <div>
        <Image
          src="/images/others/arrowLeftSlider.svg"
          alt="Previous"
          height={20}
          width={20}
          onClick={previousButtonHandler}
          data-aos-duration="600"
          data-aos="fade-right"
        />
        <Image
          src="/images/arrowRightSlider.svg"
          alt="Next"
          height={20}
          width={20}
          onClick={nextButtonHandler}
          data-aos="fade-left"
          data-aos-duration="600"
        />
      </div>
    </div>
  );
};
