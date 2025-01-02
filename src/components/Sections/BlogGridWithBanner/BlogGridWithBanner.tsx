'use client';

import { BlogCard } from '@/components/Feature/Blog/BlogCard';
import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import { Text } from '@/components/Feature/Text/Text';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './BlogGridWithBanner.module.css';

export const BlogGridWithBanner = ({ data = [], singleView = false }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  if (!data.length) {
    return <div>No blogs available.</div>;
  }
  console.log(data);
  const blogCardsMain = data[0] || {};
  const blogCardsData = data.slice(1, visibleCount + 1);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  const resolveUrl = (url) => {
    if (url?.startsWith('//')) {
      return `https:${url}`; // Convert protocol-relative URLs to absolute URLs
    }
    return url || '/default-image.jpg'; // Fallback to a default image if the URL is undefined
  };

  const renderBlogCard = (el, index) => {
    if (!el.fields) {
      return <div key={uuidv4()}>Missing data for this blog card</div>;
    }

    return (
      <BlogCard
        key={el.sys?.id || uuidv4()}
        image={resolveUrl(el.fields.images?.fields?.file?.url)}
        date={el.fields.date || 'No date available'}
        heading={el.fields.name || 'No title available'}
        description={el.fields.shortDescription || 'No description available'}
        to={`${el.fields.slug}`}
        duration={`${index + 2}00`}
        animation="fade-up"
      />
    );
  };

  return (
    <div className={styles.blogGridWithBanner}>
      <Container className="main margins">
        <div>
          {/* Hero Blog Section */}
          <header className={styles.heroBlog}>
            {blogCardsMain && blogCardsMain.fields?.images?.fields?.file?.url && (
              <figure className={styles.heroImage}>
                <Image
                  src={resolveUrl(blogCardsMain.fields.images.fields.file.url)}
                  alt={blogCardsMain.fields.name || 'Blog Hero Image'}
                  data-aos="fade-up"
                  data-aos-duration="800"
                  width={50}
                  height={50}
                />
              </figure>
            )}
            <div className={styles.heroContent}>
              <Text
                className="titory--bold"
                animation="fade-up"
                duration="500"
              >
                {blogCardsMain.fields?.date || 'No date available'}
              </Text>
              <Heading
                className="titory"
                animation="fade-up"
                duration="600"
              >
                {blogCardsMain.fields?.name || 'No title available'}
              </Heading>
              <Text
                className="secondary"
                animation="fade-up"
                duration="700"
              >
                {blogCardsMain.fields?.shortDescription || 'No description available'}
              </Text>
              <div className={styles.readMoreButton}>
                <Link href={`/blogs/${blogCardsMain.fields?.slug}`} passHref>
                  <Button className="primary">
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Blog Cards Section */}
          <div className={styles.blogCards}>
            {blogCardsData && blogCardsData.map(renderBlogCard)}

            {visibleCount < data.length - 1 && (
              <div className={styles.loadMoreContainer}>
                <Button className="primary" onClick={handleLoadMore}>
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Single View Section */}
        {singleView && (
          <section className={styles.singleViewSection}>
            {data.map(renderBlogCard)}
          </section>
        )}
      </Container>
    </div>
  );
};
