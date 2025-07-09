"use client";

import styles from "./page.module.css";

import { useEffect, useState } from "react";

import SwipeBar from "./components/swipebar";
import MainMeals from "./components/mainMeals";

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
