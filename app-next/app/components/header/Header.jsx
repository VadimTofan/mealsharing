'use client';

import styles from './page.module.scss';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import BurgerMenu from './components/Burgermenu';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.header__scrolled : ''}`}>
      <Link href="/">
        <div className={styles.header__logo}>
          <Image
            src="/images/mainlogo.png"
            alt="Mealsharing Logo"
            className={styles.header__logoImage}
            width={50}
            height={50}
          />
        </div>
      </Link>
      <BurgerMenu />
    </header>
  );
}
