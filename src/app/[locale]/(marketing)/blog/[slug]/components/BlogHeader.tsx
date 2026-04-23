import React from 'react';
import type { Author } from '@/types/blog';

type BlogHeaderProps = {
  title: string;
  author: Author;
  publishDate: string;
  updatedDate?: string;
  readTime?: number;
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'Unknown';
  }
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  author,
  publishDate,
  updatedDate,
  readTime,
}) => {
  const displayedDate = updatedDate ?? publishDate;
  const dateLabel = updatedDate ? 'Last Updated' : 'Published';

  return (
    <div>
      <h1 style={{ marginBottom: '1rem', maxWidth: '22ch' }}>{title}</h1>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        className="blogAuthor"
      >
        <div
          style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: '1rem' }}
        >
          <p>Written by</p>
          <p>{author.name}</p>
          {readTime
            ? (
                <p style={{ opacity: 0.7 }}>
                  •
                  {' '}
                  {readTime}
                  {' '}
                  min read
                </p>
              )
            : null}
        </div>
        <div>
          <p>
            {dateLabel}
            :
            {' '}
            {formatDate(displayedDate)}
          </p>
        </div>
      </div>
    </div>
  );
};
