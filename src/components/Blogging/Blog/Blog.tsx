import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
import { BlogGridWithBanner } from '@/components/Sections/BlogGridWithBanner/BlogGridWithBanner';
import Image from 'next/image';
import './blog.css';

type BlogProps = {
  blogdata: any[];
};

//  Fetch data from Contentful during build time
// export const getStaticProps: GetStaticProps = async () => {
//   const client = createClient({
//     space: 'ggtsbq0gqfii',
//     accessToken: 'VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo',
//   });

//   try {
//     const response = await client.getEntries({ content_type: 'blogs' });
//     return {
//       props: {
//         blogdata: response.items,
//       },
//       revalidate: 10, // Revalidate every 10 seconds for fresh content
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return {
//       props: {
//         blogdata: [],
//       },
//     };
//   }
// };

export const Blog = ({ blogdata }: BlogProps) => {
  return (
    <>
      {/* Background Section */}
      <div className="blogsPage">
        <Container className="main">
          <div className="blogsPage-background">
            <img
              src="/images/blogs/blogsMainBackground.svg"
              alt="background"
            />
          </div>
        </Container>

        {/* Hero Section */}
        <center>
          <Heading
            className="heroHeading"
            animation="zoom-out"
            duration="2000"
          >
            The Pixelette Post
          </Heading>
          <Text
            className="secondry"
            animation="zoom-in"
            duration="2200"
          >
            Dive into our curated collection of updates and guides to deepen
            your understanding of diverse technologies.
          </Text>
        </center>

        {/* Blog Grid Section */}
        <section>
          <BlogGridWithBanner data={blogdata} singleView />
        </section>
      </div>

      {/* "Let's Talk" Section */}
      {/* <Components.Common.LetsTalkSection /> */}
    </>
  );
};
