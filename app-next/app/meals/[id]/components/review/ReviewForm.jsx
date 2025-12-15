'use client';

import styles from './page.module.scss';

import { useState } from 'react';

import { reviewSubmit } from './ReviewSubmit';

export function ReviewForm({ id, closeForm, refreshReviews }) {
  const [state, setState] = useState({
    status: { success: null, error: null },
    rating: 0,
    review: { title: null, description: null, stars: null },
  });

  const { status, rating } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const review = {
      title: formData.get('title'),
      description: formData.get('description'),
      meal_id: id,
      stars: rating,
      created_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };

    console.log(review);

    const response = await reviewSubmit(review);

    if (response.success) {
      setState((prev) => ({
        ...prev,
        status: {
          success: `Thank you! You rated ${rating} star(s).`,
          error: null,
        },
      }));
      refreshReviews();
      setTimeout(() => {
        closeForm();
      }, 2000);
    } else {
      setState((prev) => ({
        ...prev,
        status: {
          error: `Review failed: ${response.error}.`,
          success: null,
        },
      }));
    }
  };

  const handleClick = (star) => {
    setState((prev) => ({ ...prev, rating: prev.rating === star ? 0 : star }));
  };

  return (
    <div>
      <h2 className={styles.modal__title}>Write a review</h2>
      {status.success ? (
        <p className={styles.modal__success}>{status.success}</p>
      ) : (
        <form className={styles.modal__form} onSubmit={handleSubmit}>
          <label className={styles.modal__label}>
            Review Title:
            <input
              className={styles.modal__text}
              type="text"
              name="title"
              placeholder="Title of the Review"
              minLength="4"
              required
            />
          </label>
          <label className={styles.modal__label}>
            Description
            <textarea
              className={styles.modal__description}
              name="description"
              placeholder="Type here..."
              required
            />
          </label>
          <div>
            <div className={styles.modal__rating}>
              {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                <span
                  key={star}
                  onClick={() => handleClick(star)}
                  className={`${styles.modal__star} ${star <= rating ? styles.modal__selected : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className={styles.modal__label}>Current rating: {rating}</p>
          </div>
          <button className={styles.modal__button} type="submit" style={{ maxWidth: '100%' }}>
            Submit
          </button>
        </form>
      )}
      {status.error && <p className={styles.modal__error}>{status.error}</p>}
    </div>
  );
}
