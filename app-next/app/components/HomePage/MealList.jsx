"use client";
import styles from "./MealList.module.css";
import { useEffect, useState } from "react";
import Meal from "./components/meal.jsx";

export default function MealsList() {
  const [meals, setMeals] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/all-meals`);
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
    <div className={styles.meals}>
      <h2 className={styles.meals__heading}>Available Meals</h2>
      <ul className={styles.meals__list}>{renderMeals()}</ul>
    </div>
  );
}
