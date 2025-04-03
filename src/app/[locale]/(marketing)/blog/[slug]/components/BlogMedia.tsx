import React, { useState } from 'react';
import Image from 'next/image';

interface BlogMediaProps {
  thumbnailImage: {
    fields: {
      file: {
        contentType: string;
        url: string;
      };
    };
  };
}

export const BlogMedia: React.FC<BlogMediaProps> = ({ thumbnailImage }) => {
  const [playVideo, setPlayVideo] = useState(false);

  if (!thumbnailImage?.fields?.file) return null;

  const contentType = thumbnailImage.fields.file.contentType.split('/')[0];

  if (contentType === 'video') {
    return (
      <div>
        {playVideo ? (
          <div className="videoCard">
            <video
              width="320"
              height="240"
              controls
              preload="none"
              autoPlay
              onEnded={() => setPlayVideo(false)}
            >
              <source src={`https:${thumbnailImage.fields.file.url}`} type="video/mp4" />
            </video>
          </div>
        ) : (
          <div className="videoCard">
            <button type="button" className="playBtn" onClick={() => setPlayVideo(true)}>
              <Image src="/images/playIcon.svg" width="30" height="30" alt="Play" />
            </button>
          </div>
        )}
      </div>
    );
  }

  if (contentType === 'image') {
    return (
      <div className="blogDetailBanner">
        <Image
          src={`https:${thumbnailImage.fields.file.url}`}
          quality={100}
          width={1000}
          height={250}
          alt="blog-img"
        />
      </div>
    );
  }

  return null;
}; 