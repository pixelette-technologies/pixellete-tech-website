import type { FC, ReactNode } from 'react';
// import './button.module.css';
import styles from './button.module.css';

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  animation?: string;
  type?: 'button' | 'submit' | 'reset';
  duration?: string;
  children: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  onClick,
  className = '',
  animation,
  type = 'button',
  duration,
  children,
}) => {
  const buttonClass = `${styles.btn} ${styles['glow-on-hover']} ${styles[`btn--${className}`] || ''}`.trim();

  return (
    <button
      onClick={onClick}
      className={buttonClass}
      data-aos={animation}
      type={type}
      data-aos-duration={duration}
    >
      {children}
    </button>
  );
};
