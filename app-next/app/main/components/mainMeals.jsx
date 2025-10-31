"use client";

import styles from "../page.module.scss";
import { useState, useEffect } from "react";
import Meal from "@/app/meals/components/meal/Meal";

export default function MainMeals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/top-meals`);
        if (!response.ok) throw new Error("Failed to fetch meals");
        const data = await response.json();

        setMeals(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className={styles.meals__loading}>Loading...</div>;
  if (error) return <div className={styles.meals__error}>Error: {error}</div>;

  return (
    <div className={`${styles.meals} contentcard`}>
      <div className={styles.meals__welcome}>
        <h2 className={styles.meals__heading}>Welcome to Meal Sharing</h2>
        <h3 className={styles.meals__heading}>Eat Good, Meet Cool People, Repeat.</h3>
        <p className={styles.meals__description}>
          Looking for tasty home-cooked grub and new friends? Meal Sharing hooks you up with awesome meals from locals who love to cook. No boring restaurants here, just real food, real people, and
          good times. Reserve your spot, chow down, and drop a review to keep the good vibes going. Simple, fun, and perfect for anyone who loves food and company. Jump in and let’s make mealtime
          social again.
        </p>
      </div>

      <ul className={styles.meals__list}>{meals.length > 0 ? meals.map((meal) => <Meal key={meal.id} meal={meal} />) : <li className={styles.meals__item}>No meals found.</li>}</ul>
    </div>
  );
}
