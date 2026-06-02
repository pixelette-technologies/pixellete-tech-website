import { Blog } from '@/components/Blogging/Blog/Blog';
import { createClient } from 'contentful';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IBlogProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IBlogProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Blogs',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: '/blog',
    },
  };
}

const getBlogs = async () => {
  const client = createClient({
    space: 'ggtsbq0gqfii',
    accessToken: 'VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo',
  });

  const response = await client.getEntries({ content_type: 'blogsPage' });
  return response.items;
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

export default async function Blogs(props: IBlogProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });
  const blogData = await getBlogs();
  return (
    <>
      {/* BreadcrumbList JSON-LD (server-rendered), audit P1-47/P6-19 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://pixelettetech.com/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Blog\",\"item\":\"https://pixelettetech.com/blog\"}]}" }} />
      <Blog blogdata={blogData} />
      {/* <p>{t('about_paragraph')}</p>

      <div className="mt-2 text-center text-sm">
        {`${t('translation_powered_by')} `}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://l.crowdin.com/next-js"
        >
          Crowdin
        </a>
      </div>

      <a href="https://l.crowdin.com/next-js">
        <Image
          className="mx-auto mt-2"
          src="/assets/images/crowdin-dark.png"
          alt="Crowdin Translation Management System"
          width={128}
          height={26}
        />
      </a> */}
    </>
  );
};
