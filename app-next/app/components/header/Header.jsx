'use client';

import styles from './page.module.scss';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import BurgerMenu from './components/BurgerMenu';

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
      <Link href="/" className={styles.header__brand} aria-label="Mealsharing home">
        <div className={styles.header__logo}>
          <Image
            src="/images/mainlogo.png"
            alt="Mealsharing logo"
            className={styles.header__logoImage}
            width={56}
            height={56}
          />
        </div>
        <div className={styles.header__copy}>
          <span className={styles.header__title}>Mealsharing</span>
          <span className={styles.header__subtitle}>Hosted dinners with style</span>
        </div>
      </Link>
      <BurgerMenu />
    </header>
  );
}
