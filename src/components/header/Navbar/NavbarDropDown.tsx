'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './navbar.module.css';

type SubMenu = {
  id: string;
  name: string;
  to?: string; // 'href' is preferred for Next.js instead of 'to'
  subMenus?: SubMenu[];
};

type NavbarDropDownProps = {
  name: string;
  subMenus: SubMenu[];
};

export const NavbarDropDown: FC<NavbarDropDownProps> = ({ name, subMenus }) => {
  const [active, setActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <section
        onClick={() => setActive(!active)}
        className={styles.dropdownHeader}
      >
        <p>{name}</p>
        <motion.div
          animate={active ? { rotate: -180 } : { rotate: 0 }}
          className={styles.arrowIcon}
        >
          <IoIosArrowDown />
        </motion.div>
      </section>
      {active && (
        <motion.div
          initial={{ y: '-6rem', opacity: 0 }}
          animate={{ y: '0rem', opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.subMenu}
        >
          {subMenus.map(el =>
            el.subMenus
              ? (
                  <NavbarDropDown
                    key={el.id}
                    name={el.name}
                    subMenus={el.subMenus}
                  />
                )
              : (
                  <Link key={el.id} href={el.to || '#'} onClick={() => setActive(false)}>
                    {el.name}
                  </Link>
                ),
          )}
        </motion.div>
      )}
    </div>
  );
};
