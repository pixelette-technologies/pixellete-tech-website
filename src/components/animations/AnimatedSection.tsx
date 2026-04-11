'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import GradientBlur from './GradientBlur';

type AnimatedSectionProps = {
  children: ReactNode;
  animation?: 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'fadeUp' | 'fadeDown' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
  gradientColors?: string[];
  gradientDirection?: 'top' | 'bottom' | 'left' | 'right';
  gradientHeight?: string;
  gradientBlurAmount?: number;
  gradientOpacity?: number;
  hasGradient?: boolean;
};

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  },
  fadeUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
};

export default function AnimatedSection({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  className = '',
  gradientColors = ['transparent', 'rgba(0, 0, 0, 0.8)'],
  gradientDirection = 'bottom',
  gradientHeight = '150px',
  gradientBlurAmount = 10,
  gradientOpacity = 1,
  hasGradient = true,
}: AnimatedSectionProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={animations[animation].initial}
        animate={animations[animation].animate}
        transition={{
          duration,
          delay,
          ease: 'easeOut',
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {hasGradient && (
        <GradientBlur
          colors={gradientColors}
          direction={gradientDirection}
          height={gradientHeight}
          blurAmount={gradientBlurAmount}
          opacity={gradientOpacity}
        />
      )}
    </div>
  );
}
