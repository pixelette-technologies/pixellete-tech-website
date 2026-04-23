'use client';

import Image from 'next/image';
import React, { useState } from 'react';

type BlogMediaProps = {
  thumbnailImage: string;
  title: string;
  isVideo?: boolean;
};

export const BlogMedia: React.FC<BlogMediaProps> = ({
  thumbnailImage,
  title,
  isVideo = false,
}) => {
  const [playVideo, setPlayVideo] = useState(false);

  if (!thumbnailImage) {
    return null;
  }

  if (isVideo) {
    return (
      <div className="videoCard" style={{ position: 'relative', marginBottom: '2rem' }}>
        {playVideo
          ? (
              <video controls autoPlay style={{ maxWidth: '100%', width: '100%', height: 'auto' }}>
                <source src={thumbnailImage} />
                Your browser does not support the video tag.
              </video>
            )
          : (
              <button
                type="button"
                onClick={() => setPlayVideo(true)}
                aria-label={`Play video: ${title}`}
                style={{
                  position: 'relative',
                  display: 'block',
                  width: '100%',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: 'transparent',
                }}
              >
                <video
                  style={{ maxWidth: '100%', width: '100%', height: 'auto' }}
                  preload="metadata"
                >
                  <source src={thumbnailImage} />
                </video>
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '4rem',
                    color: 'white',
                    textShadow: '0 0 20px rgba(0,0,0,0.6)',
                  }}
                >
                  ▶
                </span>
              </button>
            )}
      </div>
    );
  }

  return (
    <div className="blogDetailBanner">
      <Image
        src={thumbnailImage}
        quality={100}
        width={1000}
        height={250}
        alt={title}
      />
    </div>
  );
};
