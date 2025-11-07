import { createClient } from 'contentful';

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

export const fetchBlogPosts = async () => {
  const entries = await client.getEntries({
    content_type: 'blogPost', // your content type ID
    order: '-fields.date', // order by date descending
  });
  return entries.items;
};

export const fetchBlogPostById = async (id) => {
  const entry = await client.getEntry(id);
  return entry;
};
