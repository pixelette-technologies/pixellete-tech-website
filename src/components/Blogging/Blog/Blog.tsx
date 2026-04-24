import { Container } from '@/components/Feature/Container/Container';
import { BlogGridWithBanner } from '@/components/Sections/BlogGridWithBanner/BlogGridWithBanner';
import type { Blog as BlogType } from '@/types/blog';
import './blog.css';

type BlogProps = {
  blogdata: BlogType[];
};

export const Blog: React.FC<BlogProps> = ({ blogdata }) => {
  return (
    <div className="blogsPage">
      <Container className="main">
        <div className="blogsPage-background">
          <img src="/images/blogs/blogsMainBackground.svg" alt="" />
        </div>
      </Container>
      <center>
        <h1>The Pixelette Post</h1>
        <p>
          Dive into our curated collection of updates and guides to deepen
          your understanding of diverse technologies.
        </p>
      </center>
      <section>
        <BlogGridWithBanner data={blogdata} singleView />
      </section>
    </div>
  );
};
