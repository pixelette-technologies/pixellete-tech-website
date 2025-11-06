// components/Mobile/MobileNavButton.tsx (Client Component)
'use client';

import { useEffect, useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import styles from '../navbar.module.css';
import { MobileNav } from './MobileNav';

export const MobileNavButton = () => {
  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = activeMenu ? 'hidden' : 'auto';
  }, [activeMenu]);

  return (
    <>
      <button onClick={() => setActiveMenu(!activeMenu)} className={styles.menuButton}>
        {activeMenu ? '✖' : <IoMenuOutline size={30} />}
      </button>
      {activeMenu && <MobileNav onClick={() => setActiveMenu(false)} />}
    </>
  );
};
