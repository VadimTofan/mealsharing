"use client";

import styles from "./components/mealData/page.module.css";

import React, { useState } from "react";

import fetchData from "./components/MealData/FetchData";
import MealCard from "./components/MealData/MealCard";

export default function MealsId({ params }) {
  const { id } = React.use(params);
  const { meal, error, isLoading, refreshMeal } = fetchData(id);

  const [reviewsKey, setReviewsKey] = useState(0);

  const refreshReviews = () => {
    setReviewsKey((prev) => prev + 1);
  };

  if (isLoading) return <div className={styles.meals__loading}>Loading...</div>;
  if (error) return <div className={styles.meals__error}>Error: {error}</div>;

  return <MealCard meal={meal} completeAction={refreshMeal} refreshReviews={refreshReviews} reviewsKey={reviewsKey} />;
}
