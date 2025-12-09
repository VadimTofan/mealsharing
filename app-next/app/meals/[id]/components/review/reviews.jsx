'use client';

import styles from './page.module.scss';

import { useState, useEffect } from 'react';

import { ReviewRender } from './ReviewRender';
import { Error } from '@/app/components/error/Error';
import { Loading } from '@/app/components/loading/Loading';

export function Reviews({ id }) {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/reviews/${id}`);
        if (!response.ok) throw new Error('Review request failed');

        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [id]);

  if (error) return <Error error={error} />;

  if (!reviews) return <Loading />;

  const reviewVaildation = () => {
    if (reviews && reviews.length > 1)
      return reviews.map((review) => <ReviewRender key={review.id} review={review} />);
    if (reviews) return <ReviewRender key={reviews.id} review={reviews} />;
    return <li className={styles.meals__item}>No meals found.</li>;
  };

  return (
    <div className={styles.reviews}>
      <h2 className={styles.reviews__heading}>Recent Reviews</h2>
      <div className={styles.reviews__feedback}>
        <ul className={styles.reviews__list}>{reviewVaildation(reviews)}</ul>
      </div>
    </div>
  );
}
