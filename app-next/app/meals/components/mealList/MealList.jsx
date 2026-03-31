'use client';

import styles from './page.module.scss';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/app/components/header/components/AuthContext';
import { Meal } from '../meal/Meal';
import { useReservationData } from '@/app/orders/components/useReservationData';
import { ErrorComponent } from '@/app/components/error/Error';
import { LoadingComponent } from '@/app/components/loading/Loading';

export function MealList({ add }) {
  const [state, setState] = useState({ meals: null, error: null, searchTerm: '', sortOption: '' });
  const { meals, error, searchTerm, sortOption } = state;
  const { user } = useContext(AuthContext);
  const showDescription = Boolean(add);

  const { mealIds } = useReservationData(user?.id);
  const userData = mealIds?.map((meal) => meal.meal_id) || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = new URLSearchParams();

        if (searchTerm.trim()) query.set('title', searchTerm.trim());
        if (sortOption) query.set('sortKey', sortOption);

        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/meals?${query}`);
        if (!response.ok) {
          throw new Error('Failed to load meals');
        }

        const data = await response.json();
        setState((prev) => ({ ...prev, meals: data, error: null }));
      } catch (err) {
        setState((prev) => ({ ...prev, error: err.message }));
      }
    };

    fetchData();
  }, [searchTerm, sortOption, mealIds]);

  if (!meals) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <section className={styles.meals}>
      <div className={`${styles.meals__box} surface-card`}>
        <div className={styles.meals__intro}>
          <p className={styles.meals__eyebrow}>Discover meals</p>
          <h1 className={styles.meals__title}>Browse what is cooking near you.</h1>
          <p className={styles.meals__description}>
            Search by title, sort by what matters, and explore dinners that feel more personal than
            another reservation app.
          </p>
        </div>

        <form className={styles.meals__filter} onSubmit={(e) => e.preventDefault()}>
          <label className={styles.meals__field}>
            <span className={styles.meals__label}>Search meals</span>
            <input
              className={styles.meals__input}
              type="search"
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setState((prev) => ({ ...prev, searchTerm: e.target.value }))}
            />
          </label>

          <label className={styles.meals__field}>
            <span className={styles.meals__label}>Sort by</span>
            <select
              className={styles.meals__select}
              value={sortOption}
              onChange={(e) => setState((prev) => ({ ...prev, sortOption: e.target.value }))}
            >
              <option value="">Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="date_asc">Date: Oldest</option>
              <option value="date_desc">Date: Newest</option>
            </select>
          </label>
        </form>

        {meals.length > 0 ? (
          <ul className={styles.meals__list}>
            {meals.map((meal) => (
              <Meal key={meal.id} meal={meal} description={showDescription} userdata={userData} />
            ))}
          </ul>
        ) : (
          <div className={styles.meals__empty}>
            <p className={styles.meals__emptyText}>No meals found. Try a broader search.</p>
          </div>
        )}
      </div>
    </section>
  );
}
