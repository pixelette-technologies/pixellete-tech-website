"use client"
import { Container } from '@/components/Feature/Container/Container';
import DetailsNavigate from '@/components/Policies/DetailNavigate/DetailsNavigate';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { createClient } from 'contentful';
import React, { useEffect, useState } from 'react';
import './blogdetail.css';
import { useParams } from 'next/navigation';

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
  const [singleBlogDetail, setSingleBlogDetail] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const client = createClient({
      space: "ggtsbq0gqfii",
      accessToken: "VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo",
    });
    const getEntryById = async () =>{
      try {
        client.getEntry({content_type: 'blogs'}).then((response) => {
        console.log("response: ", response);
        setSingleBlogDetail(response);
        })
      } catch (error) {
        console.log(error)
      }
    }

    getEntryById()
}, [])
  // const blog = await getBlogPost(params.slug);

  // if (!blog) {
  //   return <div>Blog post not found</div>;
  // }

  // const { title, content, bannerImage } = blog.fields;

  // Prepare data for DetailsNavigate
  // const singleBlogDetail = {
  //   title,
  //   content,
  //   bannerImage: bannerImage?.fields?.file?.url,
  // };

  return (
    <>
      <div className="blogDetail">
        <Container className="main">
          <div className="blogDetail-background">
            <img
              src="/images/blogs/singleBlogBackground.svg"
              alt="blog"
            />
          </div>
        </Container>
        <section>
          <Container className="main margins">
            <DetailsNavigate
              data={singleBlogDetail} // Pass the blog data as props
              headingIndex={false}
              overViewIndex={false}
              headerSection
            />
          </Container>
        </section>
      </div>
      <EvaluateBusiness />
      {/* Uncomment if you want to use the blog post content later */}
      {/*
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
      */}
    </>
  );
};

export default BlogPostPage;
