"use client";

import styles from "./header.module.css";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <Logo />

      <button className={`${styles.header__burger} ${menuOpen ? styles.open : ""}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`${styles.header__navigation} ${menuOpen ? styles.open : ""}`}>
        <ul className={styles.header__list}>
          <li className={styles.header__link}>
            <Link href="/about">About</Link>
          </li>
          <li className={styles.header__link}>
            <Link href="/meals">Meals</Link>
          </li>
          <li className={styles.header__link}>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <div className={styles.header__logo}>
      <Link href="/">
        <img src="/images/hyf.svg" alt="Logo" className={styles.header__logoImage} />
      </Link>
    </div>
  );
}
