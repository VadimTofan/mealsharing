"use client";

import styles from "./page.module.css";

import React, { useEffect, useState } from "react";

import Review, { Reviews } from "./components/review";
import Reservation from "./components/reservation";

export default function MealsId({ params }) {
  const { id } = React.use(params);
  const { meal, error, isLoading, refreshMeal } = fetchMeal(id);

  const [reviewsKey, setReviewsKey] = useState(0);

  const refreshReviews = () => {
    setReviewsKey((prev) => prev + 1);
  };

  if (isLoading) return <div className={styles.meals__loading}>Loading...</div>;
  if (error) return <div className={styles.meals__error}>Error: {error}</div>;

  return <MealCard meal={meal} completeAction={refreshMeal} refreshReviews={refreshReviews} reviewsKey={reviewsKey} />;
}

function fetchMeal(id) {
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/selectedmeal/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch meal");
      }
      const data = await response.json();
      setMeal(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { meal, error, isLoading, refreshMeal: fetchData };
}

function MealCard({ meal, completeAction, refreshReviews, reviewsKey }) {
  const availableReservations = meal.max_reservations - meal.total_guests;

  return (
    <div className={`${styles.contentcard} contentcard`}>
      <div>
        <div className={styles.meal}>
          <h2 className={styles.meal__title}>{meal.title}</h2>
          <p className={styles.meal__text}>{meal.description}</p>
          <p className={styles.meal__text}>Location: {meal.location}</p>
          <p className={styles.meal__text}>Max Reservations: {meal.max_reservations}</p>
          <p className={styles.meal__text}>Reservations Left: {availableReservations}</p>
          <p className={styles.meal__text}>Price: {meal.price}</p>
        </div>
        <div className={styles.meal__res}>
          <Reservation availableSlots={availableReservations} data={meal} completeAction={completeAction} />
          <Review id={meal.id} refreshReviews={refreshReviews} />
        </div>
      </div>
      <div>
        <Reviews id={meal.id} key={reviewsKey} />
      </div>
    </div>
  );
}
