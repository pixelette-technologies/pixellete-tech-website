import React from 'react';
import Image from 'next/image';
import { Entry } from 'contentful';

interface BlogHeaderProps {
  title: string;
  author: Entry<any>;
  updatedAt: string;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({ title, author, updatedAt }) => {
  const authorName = author?.fields?.name as string || 'Unknown Author';
  
  return (
    <div>
      <h1 style={{ marginBottom: '1rem', maxWidth: '22ch' }}>{title}</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="blogAuthor">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: '1rem' }}>
          <p>Written by</p>
          <p>{authorName}</p>
        </div>
        <div>
          <p>
            Last Updated:{' '}
            {updatedAt
              ? new Date(updatedAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  );
}; 