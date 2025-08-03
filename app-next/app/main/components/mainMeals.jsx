"use client";

import styles from "../page.module.css";

import { useState, useEffect } from "react";

import Meal from "@/app/meals/components/meal/meal";

export default function MainMeals() {
  const [meals, setMeals] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/top-meals`);
        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }
        const data = await response.json();
        setMeals(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  if (error) return <div className={styles.meals__error}>Error: {error}</div>;

  if (meals === null) return <div className={styles.meals__loading}>Loading...</div>;

  const renderMeals = () => {
    if (meals && meals.length > 1) return meals.map((meal) => <Meal key={meal.id} meal={meal} />);
    if (meals) return <Meal key={meals.id} meal={meals} />;

    return <li className={styles.meals__item}>No meals found.</li>;
  };

  return (
    <div className={`${styles.meals} contentcard`}>
      <div className={styles.meals__welcome}>
        <h2 className={styles.meals__heading}>Welcome to Meal Sharing</h2>
        <h3 className={styles.meals__heading}>Eat Good, Meet Cool People, Repeat.</h3>
        <p className={styles.meals__description}>
          Looking for tasty home-cooked grub and new friends? Meal Sharing hooks you up with awesome meals from locals who love to cook. No boring restaurants here — just real food, real people, and
          good times. Reserve your spot, chow down, and drop a review to keep the good vibes going. Simple, fun, and perfect for anyone who loves food and company. Jump in and let’s make mealtime
          social again.
        </p>
      </div>
      <ul className={styles.meals__list}>{renderMeals()}</ul>
    </div>
  );
}
