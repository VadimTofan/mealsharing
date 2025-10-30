"use client";

import styles from "./page.module.scss";

import MealList from "./components/mealList/MealList";

import { useState, useEffect } from "react";

export default function Meals() {
  const [showTortilla, setShowTortilla] = useState(false);
  const [showBeans, setShowBeans] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTortilla(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBeans(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className={`${styles.tortilla} ${showTortilla ? styles.tortilla__show : ""}`} />;
      <div className={`${styles.beans} ${showBeans ? styles.beans__show : ""}`} />;
      <MealList add="description" />;
    </>
  );
}
