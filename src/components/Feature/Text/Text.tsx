import type { ReactNode } from 'react';
import React from 'react';
import './text.css';

type TextProps = {
  className?: string;
  dangerouslySetInnerHTML?: { __html: string };
  animation?: string;
  duration?: string;
  children?: ReactNode;
};

export const Text: React.FC<TextProps> = ({
  className = '',
  dangerouslySetInnerHTML,
  animation,
  duration,
  children,
}) => {
  return (
    <p
      className={`text text-${className}`}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      data-aos={animation}
      data-aos-duration={duration}
    >
      {children}
    </p>
  );
};

export default Text;
