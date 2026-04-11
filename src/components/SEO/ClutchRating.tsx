import React from 'react';

type ClutchRatingProps = {
  clutchProfileUrl: string;
  aggregateRating: number;
  ratingCount: number;
  reviews: {
    author: string;
    datePublished: string;
    reviewBody: string;
    reviewRating: number;
  }[];
};

const ClutchRating: React.FC<ClutchRatingProps> = ({
  clutchProfileUrl,
  aggregateRating,
  ratingCount,
  reviews,
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Pixelette Technologies',
    'url': clutchProfileUrl,
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': aggregateRating.toFixed(1),
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': ratingCount,
    },
    'review': reviews.map(review => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': review.author,
      },
      'datePublished': review.datePublished,
      'reviewBody': review.reviewBody,
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': review.reviewRating.toFixed(1),
        'bestRating': '5',
        'worstRating': '1',
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default ClutchRating;
