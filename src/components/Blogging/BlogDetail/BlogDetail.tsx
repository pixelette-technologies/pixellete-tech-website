'use client';
import { Container } from '@/components/Feature/Container/Container';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { createClient } from 'contentful';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const BlogDetail = () => {
  const [singleBlogDetail, setSingleBlogDetail] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const client = createClient({
      space: 'ggtsbq0gqfii',
      accessToken: 'VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo',
    });
    const getEntryById = async () => {
      try {
        client.getEntry({ content_type: 'blogs' }).then((response) => {
          console.log('response: ', response);
          setSingleBlogDetail(response);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getEntryById();
  }, []);
  console.log(singleBlogDetail);

  // let el = data.blogsData.find((item) => item.id === id * 1);
  return (
    <>
      <div className="blogDetail">
        <Container className="main">
          <div className="blogDetail-background">
            <img src="/images/blogs/singleBlogBackground.svg" alt="blog" />
          </div>
        </Container>
        <section>
          {/* <Container className="main margins">
            <DetailsNavigate
              // data={singleBlogDetail}
              headingIndex={false}
              overViewIndex={false}
              headerSection={true}
            />
          </Container> */}
        </section>
      </div>
      <EvaluateBusiness
        heading="Ready to become a tech success story?"
        description="Don’t let technical hurdles stand in the way of building powerful tech solutions. Let us help you bring your vision to life with innovative, cost-effective and reliable services. Get in touch!"
      />
    </>
  );
};

export default BlogDetail;
