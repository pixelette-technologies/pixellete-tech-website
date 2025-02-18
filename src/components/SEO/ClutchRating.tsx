import Head from 'next/head';
import React from 'react';

type ClutchRatingProps = {
  clutchProfileUrl: string; // Clutch profile URL
  aggregateRating: number; // Overall rating (e.g., 4.8)
  ratingCount: number; // Total number of ratings
  reviews: {
    author: string;
    datePublished: string; // Format: YYYY-MM-DD
    reviewBody: string;
    reviewRating: number; // Individual review rating
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
    '@type': 'LocalBusiness',
    'name': 'Your Business Name', // Replace with your business name
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
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default ClutchRating;
