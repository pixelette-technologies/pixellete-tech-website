'use client';

import BlogCard from '@/components/Feature/Blog/BlogCard';
import Image from 'next/image';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import type { Blog } from '@/types/blog';
import styles from './blogsection.module.css';

type BlogSectionSliderProps = {
  blogs: Blog[];
};

export const BlogSectionSlider: React.FC<BlogSectionSliderProps> = ({ blogs }) => {
  const slider = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 800, settings: { slidesToShow: 2, dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const handleNext = () => slider.current?.slickNext();
  const handlePrev = () => slider.current?.slickPrev();

  if (!blogs.length) {
    return null;
  }

  return (
    <div className={styles.sliderContainer}>
      <Slider ref={slider} {...settings}>
        {blogs.map(blog => (
          <BlogCard
            key={blog.frontmatter.slug}
            image={blog.frontmatter.thumbnailImage}
            date={blog.frontmatter.updatedDate ?? blog.frontmatter.publishDate}
            heading={blog.frontmatter.title}
            description={blog.frontmatter.description}
            to={`/blog/${blog.frontmatter.slug}`}
          />
        ))}
      </Slider>
      <div className={styles.sliderArrows}>
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous blog"
          style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <Image
            src="/images/blog/arrowLeftSlider.png"
            alt=""
            width={20}
            height={20}
          />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next blog"
          style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <Image
            src="/images/blog/arrowRightSlider.png"
            alt=""
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};
