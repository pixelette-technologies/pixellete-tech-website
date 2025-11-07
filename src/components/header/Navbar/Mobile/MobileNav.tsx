'use client';

import type { FC } from 'react';
import { Button } from '@/components/Feature/Button/Button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RxCross2 } from 'react-icons/rx';
import data from '../../../../data';
import styles from './mobilenav.module.css';
import { MobileNavDropDown } from './MobileNavDropDown';

type MobileNavProps = {
  onClick: () => void;
};

export const MobileNav: FC<MobileNavProps> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ x: '-6rem', opacity: 0 }}
      animate={{ x: '0rem', opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.mobileNavMain}
    >
      <div className={styles.navContent}>
        {data.navMenus.map(el =>
          el.subMenus
            ? (
                <MobileNavDropDown
                  key={el.id}
                  name={el.name}
                  subMenus={el.subMenus}
                  onClick={onClick}
                />
              )
            : (
                <Link key={el.id} href={el.to} onClick={onClick} className={styles.navLink}>
                  {el.name}
                </Link>
              ),
        )}
        <center>
          <Link href="/contact-us" onClick={onClick} passHref>
            <Button className="primary">
              Contact Us
            </Button>
          </Link>
        </center>
      </div>
      <figure className={styles.closeIcon}>
        <RxCross2 onClick={onClick} style={{ cursor: 'pointer' }} />
      </figure>
    </motion.div>
  );
};
