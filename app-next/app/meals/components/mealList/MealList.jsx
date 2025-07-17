"use client";

import styles from "./page.module.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/app/components/header/components/AuthContext";
import Meal from "../meal/meal.jsx";
import useReservationData from "@/app/orders/components/fetchReservationData";

export default function MealList(description) {
  const [meals, setMeals] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const { user } = useContext(AuthContext);

  const { mealIds } = useReservationData(user?.id);
  const userData = mealIds?.map((meal) => meal.meal_id) || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = "";

        if (searchTerm) query += `title=${encodeURIComponent(searchTerm)}&`;
        if (sortOption) query += `sortKey=${sortOption}&`;

        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/meals?${query}`);
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
  }, [searchTerm, sortOption]);

  if (error) return <div className={styles.meals__error}>Error: {error}</div>;
  if (meals === null) return <div className={styles.meals__loading}>Loading...</div>;

  const mealsValidation = () => {
    if (meals && meals.length > 1) return meals.map((meal, index) => <Meal key={meal.id} meal={meal} description={description} index={index} userdata={userData} />);
    if (meals.length === 0) return <li className={styles.meals__item}>No meals found.</li>;
    if (meals) return <Meal key={meals.id} meal={meals} description={description} />;
  };

  return (
    <div className={styles.meals}>
      <div className={styles.meals__box}>
        <form className={styles.meals__filter} onSubmit={(e) => e.preventDefault()}>
          <input className={styles.meals__input} type="text" placeholder="Search meals..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select className={styles.meals__select} value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort by</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="date_asc">Date: Oldest</option>
            <option value="date_desc">Date: Newest</option>
          </select>
        </form>
        <ul className={styles.meals__list}>{mealsValidation()}</ul>
      </div>
    </div>
  );
}
