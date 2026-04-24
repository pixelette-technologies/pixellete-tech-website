import Link from 'next/link';
import { Container } from '@/components/Feature/Container/Container';
import Breadcrumb from '@/components/Feature/Breadcrumb/Breadcrumb';
import { Button } from '@/components/Feature/Button/Button';

export default function BlogNotFound() {
  return (
    <div className="blog_detail">
      <Container className="main">
        <div style={{ padding: '2rem 5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: 'Not Found', href: '#' },
              ]}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4rem 2rem',
              textAlign: 'center',
              gap: '1.5rem',
            }}
          >
            <h1 style={{ fontSize: '3rem', margin: 0 }}>Blog post not found</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px' }}>
              The blog post you are looking for does not exist or may have been moved. Browse our collection of articles on AI, blockchain, and enterprise software.
            </p>
            <Link href="/blog">
              <Button className="primary">Browse all blogs</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
