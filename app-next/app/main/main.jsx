"use client";

import styles from "./page.module.scss";

import { useEffect, useState } from "react";

import SwipeBar from "./components/SwipeBar";
import MainMeals from "./components/MainMeals";

export default function Main() {
  const [showCarrot, setShowCarrot] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowCarrot(window.scrollY > 350);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.databox}>
      <div className={`${styles.carrot} ${showCarrot ? styles.carrot__show : ""}`} />
      <SwipeBar />
      <MainMeals />
    </div>
  );
}
