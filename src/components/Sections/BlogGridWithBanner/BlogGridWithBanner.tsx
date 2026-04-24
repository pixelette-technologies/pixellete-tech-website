'use client';

import { BlogCard } from '@/components/Feature/Blog/BlogCard';
import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import type { Blog } from '@/types/blog';
import styles from './BlogGridWithBanner.module.css';

type BlogGridWithBannerProps = {
  data: Blog[];
  singleView?: boolean;
};

export const BlogGridWithBanner: React.FC<BlogGridWithBannerProps> = ({
  data,
  singleView = false,
}) => {
  const [visibleCount, setVisibleCount] = useState(3);

  if (!data.length) {
    return <div>No blogs available.</div>;
  }

  const hero = data[0]!;
  const visibleCards = data.slice(1, visibleCount + 1);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const renderBlogCard = (blog: Blog, index: number) => (
    <BlogCard
      key={blog.frontmatter.slug}
      image={blog.frontmatter.thumbnailImage}
      date={blog.frontmatter.updatedDate ?? blog.frontmatter.publishDate}
      heading={blog.frontmatter.title}
      description={blog.frontmatter.description}
      to={blog.frontmatter.slug}
      duration={`${index + 2}00`}
      animation="fade-up"
    />
  );

  return (
    <div className={styles.blogGridWithBanner}>
      <Container className="main margins">
        <div>
          {/* Hero Blog Section */}
          <header className={styles.heroBlog}>
            {hero.frontmatter.thumbnailImage
              ? (
                  <figure className={styles.heroImage}>
                    <Image
                      src={hero.frontmatter.thumbnailImage}
                      alt={hero.frontmatter.title}
                      width={1000}
                      height={1000}
                    />
                  </figure>
                )
              : null}
            <div className={styles.heroContent}>
              <p>{hero.frontmatter.updatedDate ?? hero.frontmatter.publishDate}</p>
              <h3>{hero.frontmatter.title}</h3>
              <p>{hero.frontmatter.description}</p>
              <div className={styles.readMoreButton}>
                <Link href={`/blog/${hero.frontmatter.slug}`} passHref>
                  <Button className="primary">Read More</Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Blog Cards Grid */}
          <div className={styles.blogCards}>
            {visibleCards.map(renderBlogCard)}
            {visibleCount < data.length - 1
              ? (
                  <div className={styles.loadMoreContainer}>
                    <Button className="primary" onClick={handleLoadMore}>
                      Load More
                    </Button>
                  </div>
                )
              : null}
          </div>
        </div>

        {/* Single View Section (rendered only on /blog, not on home) */}
        {singleView
          ? (
              <section className={styles.singleViewSection}>
                {data.map(renderBlogCard)}
              </section>
            )
          : null}
      </Container>
    </div>
  );
};
