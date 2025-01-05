'use client';

import BlogCard from '@/components/Feature/Blog/BlogCard';
import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import { Text } from '@/components/Feature/Text/Text';
import { BlogGridWithBanner } from '@/components/Sections/BlogGridWithBanner/BlogGridWithBanner';
import { createClient } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Slider from 'react-slick';
import styles from './blogsection.module.css';

type BlogSectionProps = {
  heading?: string;
  text?: string;
};

type BlogEntry = {
  sys: {
    id: string;
  };
  fields: {
    name?: string;
    shortDescription?: string;
    slug?: string;
    date?: string;
    image?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
};

export const BlogSection: React.FC<BlogSectionProps> = ({ heading, text }) => {
  const [blogData, setBlogData] = useState<BlogEntry[]>([]);
  const slider = useRef<Slider | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = createClient({
          space: 'ggtsbq0gqfii',
          accessToken: 'VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo',
        });
        const response = await client.getEntries<BlogEntry>({ content_type: 'blogs' });
        setBlogData(response.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: { slidesToShow: 2, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handleNext = () => slider.current?.slickNext();
  const handlePrev = () => slider.current?.slickPrev();

  return (
    <div className={styles.blogSection}>
      <section>
        <Container className="main">
          <blockquote>
            <Image src="/images/blog/box_28.png" alt="Decorative box" width={20} height={20} />
            <Image src="/images/blog/box_29.png" alt="Decorative box" width={20} height={20} />
          </blockquote>
          <center>
            <Heading className="secondary" id="h_ani">
              {heading || 'The Pixelette Post'}
            </Heading>
            <Text className="secondary" id="h_ani">
              {text
              || 'Dive into our curated collection of updates and guides to deepen your understanding of diverse technologies.'}
            </Text>
            <Link href="/blogs" passHref>
              <Button className="primary" id="h_ani">
                Explore Blogs
                {' '}
                <FiExternalLink />
              </Button>
            </Link>
          </center>
        </Container>
      </section>

      {/* Blog Grid */}
      <BlogGridWithBanner data={blogData} />

      {/* Mobile Slider */}
      <div className={styles.sliderContainer}>
        <Slider ref={slider} {...settings}>
          {blogData.map((blog) => {
            const imageUrl = blog.fields?.image?.fields?.file?.url?.startsWith('//')
              ? `https:${blog.fields.image.fields.file.url}`
              : blog.fields?.image?.fields?.file?.url || '';
            return (
              <BlogCard
                key={blog.sys.id}
                image={imageUrl}
                date={blog.fields.date || 'No date available'}
                heading={blog.fields.name || 'No title'}
                description={blog.fields.shortDescription || 'No description'}
                to={`/blogs/${blog.fields.slug}`}
              />
            );
          })}
        </Slider>
        <div className={styles.sliderArrows}>
          <Image
            src="/images/blog/arrowLeftSlider.png"
            alt="Previous"
            onClick={handlePrev}
            width={20}
            height={20}
          />
          <Image
            src="/images/blog/arrowRightSlider.png"
            alt="Next"
            onClick={handleNext}
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};
