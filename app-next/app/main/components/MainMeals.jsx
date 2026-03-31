'use client';

import styles from '@/app/main/page.module.scss';
import { Meal } from '@/app/meals/components/meal/Meal';
import { ErrorComponent } from '@/app/components/error/Error';

export function MainMeals({ meals }) {
  return (
    <section className={`${styles.meals} surface-card`}>
      <div className={styles.meals__welcome}>
        <p className={styles.meals__eyebrow}>Featured meals</p>
        <h2 className={styles.meals__heading}>Reserve something that feels worth leaving home for.</h2>
        <p className={styles.meals__description}>
          Mealsharing helps hosts present memorable dinners and gives guests a cleaner way to find,
          compare, and book them. Start with a few hand-picked options below, then browse the full
          collection when you are ready.
        </p>
      </div>

      <ul className={styles.meals__list}>
        {meals?.length > 0 ? (
          meals.slice(0, 2).map((meal) => <Meal key={meal.id} meal={meal} />)
        ) : (
          <ErrorComponent error="No meals found" />
        )}
      </ul>
    </section>
  );
}
