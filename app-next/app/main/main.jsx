"use client";

import styles from "./page.module.scss";
import { useEffect, useState } from "react";

import SwipeBar from "./components/Swipebar";
import MainMeals from "./components/MainMeals";

export default function Main() {
  const [showCarrot, setShowCarrot] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowCarrot(window.scrollY > 350);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.databox}>
      <div className={`${styles.carrot} ${showCarrot && styles.carrot__show}`} />
      <SwipeBar />
      <MainMeals />
    </div>
  );
}
