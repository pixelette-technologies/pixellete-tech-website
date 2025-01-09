'use client';
import { createClient } from 'contentful';

const useContentful = () => {
  const client = createClient({
  //  space: process.env.CONTENTFUL_SPACE_ID,
  //  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: 'iu40d70qrkjm',
  accessToken: 'sa3kKcmFZSSGZEHw9FylVx0eOIuJordTBaMWfOeRf1Y',
    host: 'cdn.contentful.com',
  });

  // const getPosts = async () => {
  //   try {
  //     const entries = await client.getEntries();
  //     return entries;
  //   } catch (error) {
  //     console.log("error---->", error);
  //   }
  // };

  const getPosts = async () => {
    try {
      const entries = await client.getEntries({
        content_type: 'blogPage', // Replace 'blog' with your content type ID
      });
      return entries; // Only return the array of entries
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const getAsset = async (slug: string) => {
    try {
      const asset = await client.getAsset(slug);
      return asset;
    } catch (error) {
      console.log('error---->', error);
    }
  };

  // const getOneAssest = async (param: { slug: string }) => {
  //   try {
  //     const asset = await client.getEntries({
  //       content_type: "blogPage",
  //       "fields.slug": param.slug,
  //     });
  //     return asset.items[0]; // Returns the first matching entry
  //   } catch (error) {
  //     console.error("Error fetching asset:", error);
  //     return null; // Return null if there's an error
  //   }
  // };

  const getOneAssest = async (params: { slug: string }) => {
    try {
      const { slug } = params;
      const response = await client.getEntries({
        'content_type': 'blogPage',
        'fields.slug': slug,
        'include': 10,
      }) as any;

      // Collect linked assets from the response
      // const assets = asset.includes?.Asset || [];

      // const blogData = response.items[0]; // Main blog entry
      const blogData = response.items && response.items.length > 0 ? response.items[0] : null;
      const includes = response.includes || []; // Linked assets
      return { blogData, includes };
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return { getPosts, getAsset, getOneAssest };
};
export default useContentful;
