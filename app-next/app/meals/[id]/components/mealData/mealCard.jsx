'use client';
import styles from './page.module.scss';

import { useState, useEffect } from 'react';
import { Review } from '../review/Review';
import { Reviews } from '../review/Reviews';
import { Reservation } from '../reservation/Reservation';
import { Loading } from '@/app/components/loading/Loading';
import { Error } from '@/app/components/error/Error';
export function MealCard({ mealData }) {
  const [state, setState] = useState(0);
  const { meal, hasError, isLoading } = mealData;

  useEffect(() => {
    setState(meal?.max_reservations - meal?.total_guests);
  }, [meal?.max_reservations, meal?.total_guests]);

  const reservationUpdate = (guests) => {
    setState(meal?.max_reservations - meal?.total_guests - guests);
  };

  const mealInfo = [
    { label: 'Location', value: meal?.location },
    { label: 'Reservations Left', value: state },
    { label: 'Price', value: meal?.price },
  ];

  const [reviews, setReviews] = useState(0);

  const refreshReviews = () => {
    setReviews((prev) => prev + 1);
  };

  if (isLoading)
    return (
      <div className={styles.contentcard}>
        <Loading />
      </div>
    );
  if (hasError)
    return (
      <div className={styles.contentcard}>
        <Loading error={hasError} />
      </div>
    );
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
          <Reservation meal={meal} slots={state} reservationUpdate={reservationUpdate} />
          <Review id={meal?.id} refreshReviews={refreshReviews} />
        </div>
      </div>
    </div>
  );
}
