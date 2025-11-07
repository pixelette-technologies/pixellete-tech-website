// lib/fetchBlogBySlug.ts
import { getOneBlogPost } from './contentful';

export async function fetchBlogBySlug(slug: string) {
  const { blog, includes } = await getOneBlogPost(slug);

  if (!blog) return null;

  const content = blog.fields.body;
  const headings: any[] = [];

  content?.content?.forEach((node: any) => {
    if (node.nodeType === 'heading-2') {
      headings.push({
        text: node.content?.[0]?.value,
        id: node.content?.[0]?.value?.replace(/\s+/g, '-').toLowerCase(),
      });
    }
  });

  const blogAuthorId = blog.fields.author?.sys.id;
  const resolvedAuthor = includes?.Entry?.find(entry => entry.sys.id === blogAuthorId);
  const preContent = includes?.Entry?.find(entry => entry.sys.id === blog.fields?.preBlogBanner?.sys.id);
  const resolvedAssets = includes?.Asset || [];

  return {
    blog,
    content,
    resolvedAssets,
    resolvedAuthor,
    preContent,
    tableOfContents: headings,
  };
}
