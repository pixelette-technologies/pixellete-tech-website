'use client';

import { ComponentType } from 'react';
import MotionWrapper from './MotionWrapper';

export type AnimationType = 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'fadeUp' | 'fadeDown' | 'scale';

interface WithAnimationProps {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
}

export function withAnimation<P extends object>(
  WrappedComponent: ComponentType<P>,
  defaultAnimation: AnimationType = 'fadeIn'
) {
  return function WithAnimationComponent({
    animation = defaultAnimation,
    delay = 0,
    duration = 0.5,
    className = '',
    ...props
  }: P & WithAnimationProps) {
    return (
      <MotionWrapper animation={animation} delay={delay} duration={duration} className={className}>
        <WrappedComponent {...(props as P)} />
      </MotionWrapper>
    );
  };
} 