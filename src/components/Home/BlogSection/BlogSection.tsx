import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { BlogGridWithBanner } from '@/components/Sections/BlogGridWithBanner/BlogGridWithBanner';
import { getRecentBlogs } from '@/lib/blog';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { BlogSectionSlider } from './BlogSectionSlider';
import styles from './blogsection.module.css';

type BlogSectionProps = {
  heading?: string;
  text?: string;
  limit?: number;
};

export const BlogSection: React.FC<BlogSectionProps> = ({
  heading,
  text,
  limit = 6,
}) => {
  const blogs = getRecentBlogs(limit);

  return (
    <div className={styles.blogSection}>
      <section>
        <Container className="main">
          <blockquote>
            <Image
              src="/images/blog/box_28.png"
              alt=""
              width={20}
              height={20}
            />
            <Image
              src="/images/blog/box_29.png"
              alt=""
              width={20}
              height={20}
            />
          </blockquote>
          <center>
            <h2 id="h_ani">{heading ?? 'The Pixelette Post'}</h2>
            <p>
              {text ?? 'Dive into our curated collection of updates and guides to deepen your understanding of diverse technologies.'}
            </p>
            <Link href="/blog" passHref>
              <Button className="primary" id="h_ani">
                Explore Blogs
                {' '}
                <FiExternalLink />
              </Button>
            </Link>
          </center>
        </Container>
      </section>

      {/* Blog Grid (visible on desktop) */}
      <BlogGridWithBanner data={blogs} />

      {/* Mobile Slider (progressive enhancement) */}
      <BlogSectionSlider blogs={blogs} />
    </div>
  );
};
