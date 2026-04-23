import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/**
 * MDX plugin configuration used by the RSC MDXRemote renderer in BlogContent.tsx.
 *
 * Plugins:
 * - remarkGfm: GitHub-flavoured markdown (tables, strikethrough, task lists)
 * - rehypeSlug: auto-generates id attributes on headings for anchor links
 * - rehypeAutolinkHeadings: wraps headings in anchor tags so they are clickable
 *
 * Edit this file to change how all blog content renders.
 *
 * Type note: next-mdx-remote's SerializeOptions is not re-exported from its
 * main entry, and mdx/types is not installed. TypeScript infers the exact
 * plugin tuple types from the values below, which satisfies the stricter
 * CompileOptions shape expected by MDXRemote in BlogContent.tsx.
 */
export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  ],
};
