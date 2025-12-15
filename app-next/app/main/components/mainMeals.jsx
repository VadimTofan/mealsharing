'use client';

import styles from '@/app/main/page.module.scss';
import { Meal } from '@/app/meals/components/meal/pff';
import { ErrorComponent } from '@/app/components/error/Error';
import { useEffect, useState } from 'react';

export function MainMeals({ meals }) {
  const [state, setState] = useState();

  useEffect(() => {
    setState(meals);
  }, [meals]);

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
        {state?.length > 0 ? (
          state.map((meal) => <Meal key={meal.id} meal={meal} />)
        ) : (
          <ErrorComponent error={'No Meals Found'} />
        )}
      </ul>
    </div>
  );
}
