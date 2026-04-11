'use client';

import React from 'react';

type GradientBlurProps = {
  colors?: string[];
  direction?: 'top' | 'bottom' | 'left' | 'right';
  height?: string;
  width?: string;
  blurAmount?: number;
  opacity?: number;
  className?: string;
};

export default function GradientBlur({
  colors = ['transparent', 'rgba(0, 0, 0, 0.8)'],
  direction = 'bottom',
  height = '150px',
  width = '100%',
  blurAmount = 10,
  opacity = 1,
  className = '',
}: GradientBlurProps) {
  // Determine gradient direction
  let gradientDirection = 'to bottom';
  if (direction === 'top') {
    gradientDirection = 'to top';
  } else if (direction === 'left') {
    gradientDirection = 'to left';
  } else if (direction === 'right') {
    gradientDirection = 'to right';
  }

  // Create gradient string
  const gradientString = `linear-gradient(${gradientDirection}, ${colors.join(', ')})`;

  // Determine positioning
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    height: direction === 'left' || direction === 'right' ? '100%' : height,
    width: direction === 'left' || direction === 'right' ? width : '100%',
    zIndex: 1,
    pointerEvents: 'none',
    opacity,
  };

  // Position the gradient
  if (direction === 'bottom') {
    positionStyle.bottom = 0;
    positionStyle.left = 0;
    positionStyle.right = 0;
  } else if (direction === 'top') {
    positionStyle.top = 0;
    positionStyle.left = 0;
    positionStyle.right = 0;
  } else if (direction === 'left') {
    positionStyle.left = 0;
    positionStyle.top = 0;
    positionStyle.bottom = 0;
  } else if (direction === 'right') {
    positionStyle.right = 0;
    positionStyle.top = 0;
    positionStyle.bottom = 0;
  }

  return (
    <div
      className={`gradient-blur ${className}`}
      style={{
        ...positionStyle,
        background: gradientString,
        filter: `blur(${blurAmount}px)`,
      }}
    />
  );
}
