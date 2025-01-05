'use client';

import type { Entry } from 'contentful';
// import type { Settings } from 'react-slick';
import type Slider from 'react-slick';
import { CaseStudiCard } from '@/components/Feature/CaseSlider/CaseStudiCard';
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import { createClient } from 'contentful';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './projectsection.css';

type CaseStudyFields = {
  tags?: string[];
  image?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  shortDescription?: string;
  longDescription?: string;
};

type CaseStudy = Entry<CaseStudyFields>;

export const ProjectSection: React.FC = () => {
  const [active, setActive] = useState<string>('Blockchain');
  const [filteredData, setFilteredData] = useState<CaseStudy[]>([]);
  const [blogData, setBlogData] = useState<CaseStudy[]>([]);

  // const slider = useRef<Slider | null>(null);

  useEffect(() => {
    const client = createClient({
      space: 'ggtsbq0gqfii',
      accessToken: 'VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo',
    });

    client
      .getEntries<CaseStudyFields>({ content_type: 'caseStudies' })
      .then((response) => {
        setBlogData(response.items);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (blogData.length > 0) {
      setFilteredData(
        blogData.filter(caseStudy =>
          caseStudy.fields?.tags?.includes(active),
        ),
      );
    }
  }, [active, blogData]);

  const sliderData = Array.from(
    new Set(blogData.flatMap(caseStudy => caseStudy.fields?.tags || [])),
  );

  // const settings: Settings = {
  //   dots: false,
  //   infinite: true,
  //   arrows: false,
  //   speed: 700,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1424,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: false,
  //       },
  //     },
  //     {
  //       breakpoint: 1124,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: false,
  //       },
  //     },
  //     {
  //       breakpoint: 800,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         initialSlide: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 400,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 1,
  //       },
  //     },
  //   ],
  // };

  //   const nextButtonHandler = () => {
  //     slider.current?.slickNext();
  //     setShowPrevious(true);
  //   };
  //
  //   const previousButtonHandler = () => {
  //     slider.current?.slickPrev();
  //   };

  const handleActiveBtn = (element: string) => {
    setActive(element);
  };

  return (
    <div className="exploreProjectSections">
      <section>
        <center>
          <Heading
            className="secondry"
            animation="fade-up"
            duration="400"
            id="h_ani"
          >
            Explore Our Projects
          </Heading>
        </center>
      </section>
      <Container className="main margins">
        <header>
          <div data-aos="fade-up" data-aos-duration="500">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0 auto',
              }}
            >
              {sliderData.map(el => (
                <button
                  id={active === el ? 'toggleActive' : 'toggleInActive'}
                  onClick={() => handleActiveBtn(el)}
                  key={uuidv4()}
                  style={{ fontSize: '2rem' }}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
        </header>
        <section>
          {filteredData.map((el) => {
            const imageUrl = el.fields?.image?.fields?.file?.url?.startsWith('//')
              ? `https:${el.fields.image.fields.file.url}`
              : el.fields?.image?.fields?.file?.url || '';
            return (
              <CaseStudiCard
                key={el.sys?.id}
                to={el.sys?.id}
                image={imageUrl}
                name={el.fields?.shortDescription || ''}
                tags={el.fields?.tags || []}
                description={el.fields?.longDescription || ''}
              />
            );
          })}
        </section>
      </Container>
    </div>
  );
};
