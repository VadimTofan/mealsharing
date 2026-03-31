'use client';

import styles from './page.module.scss';

import { useState, useEffect } from 'react';
import { Review } from '../review/Review';
import { Reviews } from '../review/Reviews';
import { Reservation } from '../reservation/Reservation';

export function MealCard({ mealData }) {
  const [state, setState] = useState({ slots: null, reviews: null, visitors: 0 });
  const { meal } = mealData;
  const { slots, reviews, visitors } = state;

  const max = meal?.max_reservations ?? 0;
  const total = meal?.total_guests ?? 0;
  const availableSlots = max - total;

  useEffect(() => {
    setState((prev) => ({ ...prev, slots: availableSlots }));
  }, [availableSlots]);

  const reservationUpdate = (guests) => {
    const reserved = Number(visitors) + Number(guests);
    const updatedSlots = max - total - reserved;

    setState((prev) => ({
      ...prev,
      visitors: reserved,
      slots: updatedSlots,
    }));
  };

  const mealInfo = [
    { label: 'Location', value: meal?.location },
    { label: 'Reservations left', value: slots ?? 0 },
    { label: 'Price', value: `${meal?.price},-` },
  ];

  const refreshReviews = () => {
    setState((prev) => ({ ...prev, reviews: prev.reviews + 1 || 1 }));
  };

  return (
    <section className={styles.contentcard}>
      <div className={`${styles.meal__box} surface-card`}>
        <div className={styles.meal}>
          <p className={styles.meal__eyebrow}>Meal details</p>
          <h1 className={styles.meal__title}>{meal?.title}</h1>
          <p className={styles.meal__text}>{meal?.description}</p>

          <div className={styles.meal__info}>
            {mealInfo.map((info) => (
              <div className={styles.meal__metric} key={info.label}>
                <span className={styles.meal__metricLabel}>{info.label}</span>
                <span className={styles.meal__metricValue}>{info.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.meal__res}>
          <Reservation meal={meal} slots={slots} reservationUpdate={reservationUpdate} />
          <Review id={meal?.id} refreshReviews={refreshReviews} />
        </div>
      </div>

      <div className={`${styles.reviews__box} surface-card`}>
        <Reviews id={meal?.id} key={reviews} />
      </div>
    </section>
  );
}
