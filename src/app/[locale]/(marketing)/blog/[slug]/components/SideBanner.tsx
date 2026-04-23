import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import type { BlogBanner } from '@/types/blog';

type SideBannerProps = {
  banner: BlogBanner | null;
};

export const SideBanner: React.FC<SideBannerProps> = ({ banner }) => {
  if (!banner) return null;

  return (
    <div
      id="hiddenSectionBlog"
      className="custom-col"
      style={{
        width: '450px',
        backgroundColor: '#0F0F0FB2',
        padding: '2rem',
        borderRadius: '13.84px',
        position: 'sticky',
        top: '20px',
        zIndex: 10,
      }}
    >
      {banner.image
        ? (
            <div style={{ marginBottom: '1.5rem' }}>
              <Image
                src={banner.image}
                alt={banner.headline}
                width={400}
                height={200}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </div>
          )
        : null}

      <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>{banner.headline}</h2>

      {banner.body
        ? (
            <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>{banner.body}</p>
          )
        : null}

      <Link
        href={banner.ctaLink}
        style={{
          display: 'inline-block',
          padding: '0.875rem 1.75rem',
          borderRadius: '8px',
          background: '#ffffff',
          color: '#0a0a1e',
          textDecoration: 'none',
          fontWeight: 600,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {banner.ctaText}
      </Link>
    </div>
  );
};
