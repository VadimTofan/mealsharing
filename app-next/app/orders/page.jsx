"use client";

import styles from "./page.module.css";
import { useContext } from "react";
import { AuthContext } from "@/app/components/header/components/AuthContext";
import useReservationData from "./fetchReservationData";
import useMealsData from "./fetchMealData";
import Meal from "@/app/meals/components/meal/meal";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const { mealIds, error: reservationsError, isLoading: reservationsLoading } = useReservationData(user?.id);
  const ids = mealIds;

  const { meals, error: mealsError } = useMealsData(ids);

  const mealsValidation = () => {
    if (meals && meals.length > 0) return meals.map((meal, index) => <Meal key={meal.id} meal={meal} description="description" index={index} />);
    if (meals.length === 0) return <li className={styles.profile__item}>No meals found.</li>;
  };
  return (
    <div className={styles.profile}>
      {user && <h2 className={styles.profile__title}>Your Reservations</h2>}
      {!user && <p className={styles.profile__text}>You have not logged in yet.</p>}
      {reservationsLoading && <p className={styles.profile__loading}>Loading reservations...</p>}
      {mealsError && <p className={styles.profile__error}>Error loading meals: {mealsError}</p>}

      {user &&
        (meals && meals.length > 0 ? <ul className={styles.profile__list}>{mealsValidation()}</ul> : !reservationsLoading && <p className={styles.profile__text}>You have no reservations yet.</p>)}
    </div>
  );
}
