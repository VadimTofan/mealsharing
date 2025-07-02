"use client";

import styles from "./header.module.css";

import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />
    </header>
  );
}

function Logo() {
  return (
    <div className={styles.header__logo}>
      <Link href="/">
        <img src="/images/hyf.svg" alt="Logo" className={styles.header__logoImage} />
      </Link>
      <Link href="/">
        <span className={styles.header__title}>Meal Sharing App - HYF</span>
      </Link>
    </div>
  );
}

function Navbar() {
  return (
    <ul className={styles.header__navigation}>
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
  );
}
