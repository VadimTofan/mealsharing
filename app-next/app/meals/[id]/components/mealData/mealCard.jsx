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
    setState((prev) => ({ ...prev, visitors: reserved }));
    const updatedSlots = max - total - reserved;

    setState((prev) => ({
      ...prev,
      slots: updatedSlots,
    }));
    guests = 0;
  };

  const mealInfo = [
    { label: 'Location', value: meal?.location },
    { label: 'Reservations Left', value: slots ?? 0 },
    { label: 'Price', value: meal?.price },
  ];

  const refreshReviews = () => {
    setState((prev) => ({ ...prev, reviews: prev + 1 }));
  };

  return (
    <div className={styles.contentcard}>
      <div className={styles.reviews__box}>
        <Reviews id={meal?.id} key={reviews} />
      </div>
      <div className={styles.meal__box}>
        <div className={styles.meal}>
          <h2 className={styles.meal__title}>{meal?.title}</h2>
          <p className={styles.meal__text}>{meal?.description}</p>

          <div className={styles.meal__info}>
            {mealInfo.map((info, index) => (
              <p className={styles.meal__text} key={index}>
                {info.label}: {info.value}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.meal__res}>
          <Reservation meal={meal} slots={slots} reservationUpdate={reservationUpdate} />
          <Review id={meal?.id} refreshReviews={refreshReviews} />
        </div>
      </div>
    </div>
  );
}
