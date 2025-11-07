import React from 'react';
import './heading.css';

type HeadingProps = {
  className?: string;
  animation?: string;
  duration?: string;
  id?: string;
  children: React.ReactNode;
};

export const Heading: React.FC<HeadingProps> = ({
  className = '',
  animation,
  duration,
  id,
  children,
}) => {
  return (
    <h1
      className={`heading-${className}`}
      data-aos={animation}
      data-aos-duration={duration}
      id={id}
    >
      {children}
    </h1>
  );
};
