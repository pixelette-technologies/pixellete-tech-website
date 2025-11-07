'use client';

import type { FC } from 'react';
import Image from 'next/image';

export const Navbar: FC = () => {
  return (
    <header className="flex items-center justify-between px-[140px] py-6">
      <Image src="/images/logo.jpg" alt="Logo" width={164} height={64} />
      <nav className="flex gap-8">
        <a href="#" className="text-base text-white">
          Home
        </a>
        <div className="flex items-center gap-1">
          <a href="#" className="text-base text-white">
            Services
          </a>
          <Image src="/images/arrowup.jpg" alt="Dropdown" width={24} height={24} />
        </div>
        <a href="#" className="text-base text-white">
          About Us
        </a>
        <a href="#" className="text-base text-white">
          Case Studies
        </a>
        <a href="#" className="text-base text-white">
          Pixelette Research
        </a>
        <a href="#" className="text-base text-white">
          Start-ups
        </a>
        <a href="#" className="text-base text-white">
          Blogs
        </a>
      </nav>
      <button className="rounded-[40px] bg-[#ffffff26] px-6 py-3 text-[#eff8f7]">
        Contact Us
      </button>
    </header>
    // <nav className={`${styles.navbar} flex items-center justify-between p-4`}>
    //   {/* Logo */}
    //   <div className="text-xl font-bold">
    //     <Link href="/">Logo</Link>
    //   </div>

  //   {/* Centered Menu Items */}
  //   <ul className="flex space-x-6 text-gray-700 dark:text-gray-300">
  //     <li>
  //       <Link href="/services" className="hover:text-blue-500">
  //         Services
  //       </Link>
  //     </li>
  //     <li>
  //       <Link href="/contact" className="hover:text-blue-500">
  //         Contact
  //       </Link>
  //     </li>
  //   </ul>

  //   {/* Right Side: Language Selector, Theme Toggle, Contact Us */}
  //   <div className="flex items-center space-x-4">
  //     {/* Language Dropdown */}
  //     <LocaleSwitcher />
  //     {/* <div className="group relative">
  //       <button className="hover:text-blue-500">Language</button>
  //       <div className="absolute right-0 mt-2 hidden w-32 rounded-md bg-white shadow-lg group-hover:block dark:bg-gray-800">
  //         <Link
  //           href="/"
  //           locale="en"
  //           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
  //         >
  //           English
  //         </Link>
  //         <Link
  //           href="/"
  //           locale="fr"
  //           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
  //         >
  //           French
  //         </Link>
  //       </div>
  //     </div> */}
  //     <ThemeSwitch />
  //     {/* Theme Toggle */}
  //     <div className="group relative">
  //       <button className="hover:text-blue-500">Theme</button>
  //       <div className="absolute right-0 mt-2 hidden w-32 rounded-md bg-white shadow-lg group-hover:block dark:bg-gray-800">
  //         <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
  //           Light
  //         </button>
  //         <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
  //           Dark
  //         </button>
  //         <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
  //           System
  //         </button>
  //       </div>
  //     </div>
  //     <MobileNav />
  //     {/* Contact Us CTA */}
  //     <Link
  //       href="/contact"
  //       className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
  //     >
  //       Contact Us
  //     </Link>
  //   </div>
  // </nav>
  );
};
