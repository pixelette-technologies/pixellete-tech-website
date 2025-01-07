import { Button } from '@/components/Feature/Button/Button';
import TestimonialCard from '@/components/Feature/Cards/TestimonialCard';
import { Container } from '@/components/Feature/Container/Container';
import data from '@/data'; // Adjust path based on your project structure
import { createClient } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation'; // For 404 handling
import React from 'react';
import './casestudydetail.css';

// Contentful client
const client = createClient({
  space: 'ggtsbq0gqfii',
  accessToken: 'VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo',
});

// Function to fetch a single blog post by slug
const getBlogPost = async (id: string) => {
  const response = await client.getEntry(id);
  return response; // Return the first matching item
};

// Generate metadata for SEO (optional)
// export async function generateMetadata({ params }: { params: { slug: string } }) {
//   const blog = await getBlogPost(params.slug);
//   return {
//     title: blog?.fields?.title,
//     description: blog?.fields?.description,
//   };
// }

type BlogData = {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    longDescription: string;
    projectLink?: string;
    image?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    problemStatement: string;
    solutions: string;
    conclusion: string;
  };
};

const CaseStudieDetail = async ({ params }: { params: { id: string } }) => {
  // const [blogData, setBlogData] = useState<Entry<BlogData> | null>(null);
  const blogData = await getBlogPost(params.id);
  const el = data.testimonialData[0]; // Adjust based on the structure of your data
  // useEffect(() => {
  //   const client = createClient({
  //     space: 'ggtsbq0gqfii',
  //     accessToken: 'VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo',
  //   });

  //   client
  //     .getEntry<BlogData>(id)
  //     .then((response) => {
  //       setBlogData(response);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, [id]);

  if (!blogData || blogData.sys.id !== params.id) {
    notFound();
  }
  const resolveUrl = (url) => {
    if (url?.startsWith('//')) {
      return `https:${url}`; // Convert protocol-relative URLs to absolute URLs
    }
    return url || '/default-image.jpg'; // Fallback to a default image if the URL is undefined
  };
  return (
    <>
      <div className="caseStudieDetail">
        <Container className="main">
          <div className="caseStudieDetail-background">
            <Image
              src="/images/casestudies/heroSectionBackgroundLeft.svg"
              alt="background"
              width={100}
              height={100}
            />
            <Image
              src="/images/casestudies/heroSectionBackgroundRight.svg"
              alt="backgroundImage"
              width={100}
              height={100}
            />
          </div>
        </Container>
        <section>
          <Container className="main margins">
            <header>
              <div>
                <h1>
                  {blogData.fields.name}
                </h1>
                <p>
                  {blogData.fields.longDescription}
                </p>
                {blogData.fields.projectLink && (
                  <Link href={blogData.fields.projectLink} target="_blank" rel="noopener noreferrer">
                    <Button
                      className="primary"
                      animation="fade-up"
                      duration="1100"
                    >
                      View Project
                    </Button>
                  </Link>
                )}
              </div>
              <figure>
                <img
                  // src={blogData.fields.image?.fields.file.url}
                  src={resolveUrl(blogData.fields.image?.fields.file.url)}
                  alt="cardImage"
                />
              </figure>
            </header>
            <section>
              <header data-aos="fade-up" data-aos-duration="900">
                <div>
                  <h2>
                    Problem Statement
                  </h2>
                  <p>
                    {blogData.fields.problemStatement}
                  </p>
                </div>
                <div>
                  <h2>
                    Solution
                  </h2>
                  <p>
                    {blogData.fields.solutions}
                  </p>
                </div>
              </header>
              <section data-aos="fade-up" data-aos-duration="900">
                <h2>
                  Tech Stack
                </h2>
                <div>
                  {/* Add the tech stack content here */}
                </div>
              </section>
              <figure>
                <Image
                  // src='https://'.{blogData.fields.image?.fields.file.url}
                  src={resolveUrl(blogData.fields.image?.fields.file.url)}
                  alt="Main Image"
                  width={100}
                  height={100}
                />
              </figure>
              <div>
                <h2>
                  Conclusion
                </h2>
                <p>
                  {blogData.fields.conclusion}
                </p>

              </div>
            </section>
            <blockquote>
              <header>
                <center data-aos-duration="700" data-aos="fade-up">
                  <h1 id="h_ani">
                    Conclusion
                  </h1>
                </center>
                <TestimonialCard
                  comment={el.comment}
                  profile={el.user_profile}
                  rating={el.rating}
                  userName={el.user_name}
                  role={el.user_role}
                  animation="fade-up"
                  duration="1000"
                />
              </header>
            </blockquote>
          </Container>
        </section>
      </div>
      {/* <LetsTalkSection /> */}
    </>
  );
};

export default CaseStudieDetail;
