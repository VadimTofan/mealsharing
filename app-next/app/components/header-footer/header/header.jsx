"use client";

import { useState } from "react";
import styles from "./header.module.css";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <header className={styles.header}>
      <Logo />

      <button className={styles.header__burger} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
        <span className={menuOpen ? styles.header__burgerLineOpen : styles.burgerLine}></span>
        <span className={menuOpen ? styles.header__burgerLineOpen : styles.burgerLine}></span>
        <span className={menuOpen ? styles.header__burgerLineOpen : styles.burgerLine}></span>
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
