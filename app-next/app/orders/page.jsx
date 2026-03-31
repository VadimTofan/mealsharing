'use client';
import styles from './page.module.scss';
import { useContext } from 'react';
import { AuthContext } from '@/app/components/header/components/AuthContext';
import { useReservationData } from './components/useReservationData';
import { useMealsData } from './components/useMealData';
import { Meal } from '@/app/meals/components/meal/Meal';
import { LoadingComponent } from '../components/loading/Loading';

export default function Orders() {
  const { user } = useContext(AuthContext);
  const { mealIds, isLoading: reservationsLoading } = useReservationData(user?.id);
  const ids = mealIds?.map((meal) => meal.meal_id) || [];
  const { meals } = useMealsData(ids);

  const mealsValidation = () => {
    if (meals && meals.length > 0)
      return meals.map((meal, index) => (
        <Meal key={meal.id} meal={meal} description="description" index={index} userdata={ids} />
      ));
    if (meals?.length === 0) return <li className={styles.orders__item}>No meals found.</li>;
  };

  if (reservationsLoading) return <LoadingComponent />;

  return (
    <section className={styles.orders}>
      <div className={`${styles.orders__panel} surface-card`}>
        {user && (
          <>
            <p className={styles.orders__eyebrow}>Your plans</p>
            <h1 className={styles.orders__title}>Reservations you already locked in.</h1>
          </>
        )}
        {!user && <p className={styles.orders__text}>Log in to view and manage your reservations.</p>}

        {user &&
          (meals && meals.length > 0 ? (
            <ul className={styles.orders__list}>{mealsValidation()}</ul>
          ) : (
            !reservationsLoading && (
              <p className={styles.orders__text}>{user?.name}, you have no reservations yet.</p>
            )
          ))}
      </div>
    </section>
  );
}
