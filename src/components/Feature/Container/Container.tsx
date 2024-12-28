import type { FC, ReactNode } from 'react';
import './container.css';

type ContainerProps = {
  className?: string;
  class?: string;
  children: ReactNode;
};

export const Container: FC<ContainerProps> = ({ className = '', class: additionalClass = '', children }) => {
  return (
    <div className={`container- container ${className} ${additionalClass}`}>
      {children}
    </div>
  );
};
