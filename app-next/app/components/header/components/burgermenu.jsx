"use client";

import styles from "../page.module.css";

import { useState } from "react";
import Link from "next/link";

export default function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }
  return (
    <>
      <button className={`${styles.header__burger} ${menuOpen ? styles.open : ""}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
        <span className={styles.header__line}></span>
        <span className={styles.header__line}></span>
        <span className={styles.header__line}></span>
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
    </>
  );
}
