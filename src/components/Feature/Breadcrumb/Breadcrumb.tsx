import Link from 'next/link';
import React from 'react';
import styles from './Breadcrumb.module.css';

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className={styles.breadcrumb}>
      {items.map((item, index) => (
        <span key={item.label} className={styles.breadcrumbItem}>
          {index < items.length - 1
            ? (
                <>
                  <Link href={item.href} className={styles.breadcrumbLink}>
                    {item.label}
                  </Link>
                  <span className={styles.separator}> &gt; </span>
                </>
              )
            : (
                <span className={styles.current}>{item.label}</span>
              )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
