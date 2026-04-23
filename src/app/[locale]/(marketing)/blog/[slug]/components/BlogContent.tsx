import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { mdxOptions } from '@/lib/blog-mdx';
import type { BlogBanner } from '@/types/blog';

type BlogContentProps = {
  content: string;
  preBlogBanner?: BlogBanner | null;
};

// Structural type fallback: `mdx/types` is not installed as a direct dependency
// and `@mdx-js/react` references MDXComponents internally but does not re-export
// it. A local shape keyed by HTML element name is sufficient for our usage.
type MdxComponentMap = Record<string, React.ComponentType<any>>;

const mdxComponents: MdxComponentMap = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { src, alt } = props;
    if (!src || typeof src !== 'string') return null;
    return (
      <Image
        src={src}
        alt={alt ?? ''}
        width={1000}
        height={600}
        className="contentImage"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    );
  },
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, children, ...rest } = props;
    if (!href) return <a {...rest}>{children}</a>;
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return (
        <Link href={href} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  },
};

export const BlogContent = async ({
  content,
  preBlogBanner,
}: BlogContentProps) => {
  return (
    <div className="rich-text-container">
      {preBlogBanner
        ? (
            <div
              style={{
                padding: '1.5rem',
                marginBottom: '2rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                border: '1px solid #2a2a4e',
              }}
            >
              <h3 style={{ marginTop: 0 }}>{preBlogBanner.headline}</h3>
              {preBlogBanner.body ? <p>{preBlogBanner.body}</p> : null}
              <Link
                href={preBlogBanner.ctaLink}
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  marginTop: '0.5rem',
                  borderRadius: '8px',
                  background: '#ffffff',
                  color: '#0a0a1e',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                {preBlogBanner.ctaText}
              </Link>
            </div>
          )
        : null}
      <MDXRemote
        source={content}
        components={mdxComponents}
        // Cast: our plugins (remarkGfm, rehypeSlug, rehypeAutolinkHeadings) are
        // standard unified plugins and valid at runtime. TypeScript cannot
        // thread their generic parameters through next-mdx-remote's internal
        // CompileOptions Omit. This cast acknowledges the gap without losing
        // typing on source/components (which are correctly typed).
        options={{ mdxOptions } as React.ComponentProps<typeof MDXRemote>['options']}
      />
    </div>
  );
};
