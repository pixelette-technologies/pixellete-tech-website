import { Container } from '@/components/Feature/Container/Container';
import { createClient } from 'contentful';
import Image from 'next/image';
import React from 'react';
import './blogdetail.module.css';

// Contentful client
const client = createClient({
  space: 'ggtsbq0gqfii',
  accessToken: 'VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo',
});

// Function to fetch a single blog post by slug
const getBlogPost = async (slug: string) => {
  const response = await client.getEntries({
    'content_type': 'blogs',
    'fields.slug': slug, // Filter by slug field
  });
  return response.items[0]; // Return the first matching item
};

// Generate metadata for SEO (optional)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await getBlogPost(params.slug);
  return {
    title: blog?.fields?.title,
    description: blog?.fields?.description,
  };
}

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const blog = await getBlogPost(params.slug);
  // console.log(blog);
  if (!blog) {
    return <div>Blog post not found</div>;
  }

  const { title, content, bannerImage } = blog ? blog.fields : '';

  return (
    <>
      <div className="blogDetail">
        <Container className="main">
          <div className="blogDetail-background">
            <Image
              src="/images/blogs/singleBlogBackground.svg"
              alt="blog"
              width={100}
              height={100}
            />
          </div>
        </Container>
        <section>
          {/* <Container className="main margins">
             <Components.Common.DetailsNavigate
              // data={singleBlogDetail}
              headingIndex={false}
              overViewIndex={false}
              headerSection={true}
            />
          </Container> */}
        </section>
      </div>
      {/* <Components.Common.LetsTalkSection /> */}
      <div className="blog-post">
        <Container className="main">
          <div className="blog-banner">
            <img src={bannerImage && bannerImage.fields.file.url} alt={title} />
          </div>
        </Container>
        <div className="blog-content">
          <h1>{title && title}</h1>
          <div dangerouslySetInnerHTML={content && { __html: content }} />
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
