'use client';

import dynamic from 'next/dynamic';

const PixWidget = dynamic(() => import('./PixWidget'), { ssr: false });

export default function PixLoader() {
  return <PixWidget />;
}
