'use client';

import styles from '@/app/main/page.module.scss';
import { useState, useEffect } from 'react';
import { Meal } from '@/app/meals/components/meal/Meal';
import { Loading } from '@/app/components/loading/loading';
import { Error } from '@/app/components/error/Error';

export function MainMeals() {
  const [state, setState] = useState({
    meals: [],
    error: null,
    loading: true,
  });

  const { meals, error, loading } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/top-meals`);
        if (!response.ok) throw new Error('Failed to fetch meals');
        const data = await response.json();
        setState((prev) => ({ ...prev, meals: data }));
      } catch (err) {
        setState((prev) => ({ ...prev, error: err.message }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className={styles.main}>
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className={styles.main}>
        <Error error={error} />
      </div>
    );
  return (
    <div className={`${styles.meals} contentcard`}>
      <div className={styles.meals__welcome}>
        <h2 className={styles.meals__heading}>Welcome to Meal Sharing</h2>
        <h2 className={styles.meals__heading}>Eat Good, Meet Cool People, Repeat.</h2>
        <p className={styles.meals__description}>
          Looking for tasty home-cooked grub and new friends? Meal Sharing hooks you up with awesome
          meals from locals who love to cook. No boring restaurants here, just real food, real
          people, and good times. Reserve your spot, chow down, and drop a review to keep the good
          vibes going. Simple, fun, and perfect for anyone who loves food and company. Jump in and
          let’s make mealtime social again.
        </p>
      </div>

      <ul className={styles.meals__list}>
        {meals.length > 0 ? (
          meals.map((meal) => <Meal key={meal.id} meal={meal} />)
        ) : (
          <Error error={'No Meals Found'} />
        )}
      </ul>
    </div>
  );
}
