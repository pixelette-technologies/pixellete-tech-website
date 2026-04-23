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
 * Type note: next-mdx-remote v6 does not re-export SerializeOptions from its
 * main entry, and the /dist/types subpath is not exported. We use a structural
 * type that accepts the plugins array shapes unified across remark/rehype.
 */
type MdxOptions = {
  remarkPlugins?: unknown[];
  rehypePlugins?: unknown[];
};

export const mdxOptions: MdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  ],
};
