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
import MillstoneList from '@/components/CaseStudies/MilestoneList/MillstoneList';
import technologies from '@/data/technologies';


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
  const { id } = await params;
  const blogData = await getBlogPost(id);
  // const blogData = await getBlogPost(params.id);
  const el = data.testimonialData[0]; // Adjust based on the structure of your data
  // const [blogData, setBlogData] = useState<Entry<BlogData> | null>(null);
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

  if (!blogData || blogData.sys.id !== id) {
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
        <section id='sideMargin'>
          <Container className="main margins">
            {/* <header>
              <div>
                <Image src="/images/casestudies/CaseSliderCardBanner.svg" alt='logo' width={100} height={100}/>
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
            </header> */}
            <header>
              <div>
                <Image src="/images/casestudies/CaseSliderCardBanner.svg" alt='logo' width={100} height={100} />
                <h1>
                  How We Grew Smart Contractor's Audit <br /> Time by 65%
                </h1>
                <p>
                  Fresh Prep offers fine-quality meal kits created bythe chef with local ingredients, sent directly to your door. This process helps you make healthy and delicious meals by saving time and effort. Forget about shopping and meal planning; enjoy your own well-prepared cuisine instead! Eating fresh and healthy has never been this easy!
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                  <div>
                    <p style={{ color: '#726D6D' }}>Business Type</p>
                    <p style={{ color: 'white', fontSize: '15px' }}>Security</p>
                  </div>
                  <div>
                    <p style={{ color: '#726D6D' }}>Industry</p>
                    <p style={{ color: 'white', fontSize: '15px' }}>Blockchain, Finance</p>
                  </div>
                </div>
                {/* {blogData.fields.projectLink && (
                  <Link href={blogData.fields.projectLink} target="_blank" rel="noopener noreferrer">
                    <Button
                      className="primary"
                      animation="fade-up"
                      duration="1100"
                    >
                      View Project
                    </Button>
                  </Link>
                )} */}
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
              <span style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
                <h1>
                  The blocker
                </h1>
                <p style={{ fontSize: '15px' }}>The strategic IT staff augmentation led to significant improvements and achievements:</p>
                <p style={{ fontSize: '15px' }}>The idea of Non-Fungible Tokens (NFTs) has become extremely popular in today’s quickly changing digital ecosystem. These distinctive digital assets have changed how ownership and authenticity are defined in the digital sphere, having an effect on many businesses and opening up opportunities for both producers and collectors. The technology of NFT Smart Contracts, which is at the core of NFTs and is essential to their production, sale, and transfer, is important. We will go further into the world of NFT smart contracts in this in-depth investigation, illuminating their relevance and revealing the variety of uses to which they may be put.</p>
              </span>
              <header data-aos="fade-up" data-aos-duration="900">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '2rem', gap: '3rem' }}>
                  <div>
                    <h2>
                      The goal
                    </h2>
                    <p style={{ fontSize: '15px' }}>
                      {/* {blogData.fields.problemStatement} */}
                      The idea of Non-Fungible Tokens (NFTs) has become extremely popular in today’s quickly changing digital ecosystem. These distinctive digital assets have changed how ownership and authenticity are defined in the digital sphere, having an effect on many businesses and opening up opportunities for both producers and collectors.
                    </p>
                  </div>
                  <div>
                    <h2>
                      The proposed solution
                    </h2>
                    <p style={{ fontSize: '15px' }}>
                      {/* {blogData.fields.solutions} */}
                      The idea of Non-Fungible Tokens (NFTs) has become extremely popular in today’s quickly changing digital ecosystem. These distinctive digital assets have changed how ownership and authenticity are defined in the digital sphere, having an effect on many businesses and opening up opportunities for both producers and collectors. The technology of NFT Smart Contracts.
                    </p>
                  </div>
                </div>
              </header>
              {/* <section data-aos="fade-up" data-aos-duration="900">
                <h2>
                  Tech Stack
                </h2>
                <div>
                </div>
              </section> */}
              {/* <figure>
                <Image
                  // src='https://'.{blogData.fields.image?.fields.file.url}
                  src={resolveUrl(blogData.fields.image?.fields.file.url)}
                  alt="Main Image"
                  width={100}
                  height={100}
                />
              </figure> */}
              {/* <div>
                <h2>
                  Conclusion
                </h2>
                <p>
                  {blogData.fields.conclusion}
                </p>

              </div> */}
            </section>
            {/* <blockquote>
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
            </blockquote> */}
            <MillstoneList />
            <section>
              <header style={{ textAlign: 'center', display: 'flex', flexDirection: "column" }}>
                <h1>The chosen tech stack</h1>
                <p>The strategic IT staff augmentation led to significant improvements and achievements:</p>
              </header>
              <span style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', width: '70%', margin: '0 auto', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
                {
                  technologies["AI_ML_BI"].map((x) => (
                    <img style={{ width: '50%' }} src={x.icon} alt="" />
                  ))
                }
              </span>
            </section>
              <span style={{display: 'flex', marginTop: '5rem'}}>
                <span>
                <span>
                  <h2>Our impact</h2>
                  <p style={{fontSize: '15px'}}>The idea of Non-Fungible Tokens (NFTs) has become extremely popular in today’s quickly changing digital ecosystem. These distinctive digital assets have changed how ownership and authenticity are defined in the digital sphere, having an effect on many businesses and opening up opportunities for both producers and collectors. </p>
                </span>
                <span>
                  <h1>60%</h1>
                  <p>The idea of Non-Fungible Tokens </p>
                </span>
                </span>
            <section style={{width: '100%'}}>
              <span style={{display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%'}} className='boxTick'>
              <div style={{backgroundColor: '#0F0F0FB2', padding: '1rem', borderRadius: '10px'}}>
                <h3>Accelerated Feature Launch</h3>
                <p style={{fontSize: '15px'}}>The new features were developed and launched more quickly
                than we expected, reducing the time to market.</p>
              </div>
              <div style={{backgroundColor: '#0F0F0FB2', padding: '1rem', borderRadius: '10px'}}>
                <h3>Record-High Sales</h3>
                <p style={{fontSize: '15px'}}>Sales volumes reached an all-time high, fueled by improved
                system performance and user experience.</p>
              </div>
              <div style={{backgroundColor: '#0F0F0FB2', padding: '1rem', borderRadius: '10px'}}>
                <h3>Praised User Interfaces</h3>
                <p style={{fontSize: '15px'}}>The users greatly appreciated a fresh user interface, and the
                number of people using the app increased too.</p>
              </div>
              </span>
            </section>
              </span>
          </Container>
        </section>
      </div>
      {/* <LetsTalkSection /> */}
    </>
  );
};

export default CaseStudieDetail;
