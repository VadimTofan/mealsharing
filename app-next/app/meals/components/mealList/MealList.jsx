'use client';

import styles from './page.module.scss';
import { useEffect, useState, useContext, use } from 'react';
import { AuthContext } from '@/app/components/header/components/AuthContext';
import { Meal } from '../meal/pff.jsx';
import { useReservationData } from '@/app/orders/components/useReservationData';
import { ErrorComponent } from '@/app/components/error/Error';
import { LoadingComponent } from '@/app/components/loading/Loading';

export function MealList(description) {
  const [state, setState] = useState({ meals: null, error: null, searchTerm: '', sortOption: '' });
  const { meals, error, searchTerm, sortOption } = state;
  const { user } = useContext(AuthContext);

  const { mealIds } = useReservationData(user?.id);
  const userData = mealIds?.map((meal) => meal.meal_id) || [];

  const fetchData = async () => {
    try {
      let query = '';

      if (searchTerm) query += `title=${encodeURIComponent(searchTerm)}&`;
      if (sortOption) query += `sortKey=${sortOption}&`;

      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/meals?${query}`);
      if (!response.ok) {
        throw new Error('Failed to use meals');
      }

      const data = await response.json();

      setState((prev) => ({ ...prev, meals: data }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: err.message }));
    }
  };
  useEffect(() => {
    fetchData();
  });

  if (!meals) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;
  const mealsValidation = () => {
    if (meals && meals.length > 1)
      return meals.map((meal, index) => (
        <Meal
          key={meal.id}
          meal={meal}
          description={description}
          index={index}
          userdata={userData}
        />
      ));
    if (!meals.length)
      return (
        <div className={styles.meals__item}>
          <p class={styles.meals__description}>No meals found.</p>
        </div>
      );
    if (meals) return <Meal key={meals.id} meal={meals} description={description} />;
  };

  return (
    <div className={styles.meals}>
      <div className={styles.meals__box}>
        <form className={styles.meals__filter} onSubmit={(e) => e.preventDefault()}>
          <input
            className={styles.meals__input}
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setState((prev) => ({ ...prev, searchTerm: e.target.value }))}
          />
          <select
            className={styles.meals__select}
            value={sortOption}
            onChange={(e) => setState((prev) => ({ ...prev, sortOptionTerm: e.target.value }))}
          >
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
