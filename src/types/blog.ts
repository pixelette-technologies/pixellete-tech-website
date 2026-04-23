export type BlogFrontmatter = {
  title: string;
  slug: string;
  description: string;
  author: string;
  publishDate: string;
  updatedDate?: string;
  thumbnailImage: string;
  readTime?: number;
  tags?: string[];
  preBlogBanner?: string;
  sideBannerAd?: string;
};

export type Author = {
  key: string;
  name: string;
  role?: string;
  bio?: string;
  avatar?: string;
};

export type BlogBanner = {
  id: string;
  headline: string;
  body?: string;
  ctaText: string;
  ctaLink: string;
  image?: string;
};

export type Blog = {
  frontmatter: BlogFrontmatter;
  content: string;
  mdxSource?: unknown;
};
