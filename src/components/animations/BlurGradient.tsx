'use client';

import React from 'react';

type BlurGradientProps = {
  color?: string;
  height?: string;
  className?: string;
};

export default function BlurGradient({
  color = 'rgba(0, 0, 0, 0.8)',
  height = '150px',
  className = '',
}: BlurGradientProps) {
  return (
    <div
      className={`blur-gradient ${className}`}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height,
        background: `linear-gradient(to bottom, transparent, ${color})`,
        filter: 'blur(10px)',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
