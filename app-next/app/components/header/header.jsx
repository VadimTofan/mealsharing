"use client";

import styles from "./page.module.scss";

import { useState, useEffect } from "react";
import Link from "next/link";

import BurgerMenu from "./components/BurgerMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.header__logo}>
        <Link href="/">
          <img src="/images/mainlogo.png" alt="Logo" className={styles.header__logoImage} />
        </Link>
      </div>
      <BurgerMenu />
    </header>
  );
}
