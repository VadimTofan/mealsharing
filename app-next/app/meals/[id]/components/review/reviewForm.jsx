"use client";

import styles from "./page.module.css";

import { useState } from "react";

import reviewSubmit from "./reviewSubmit";

export default function ReviewForm({ id, closeForm, refreshReviews }) {
  const [reviewStatus, setReviewStatus] = useState(null);
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const review = {
      title: formData.get("title"),
      description: formData.get("description"),
      meal_id: id,
      stars: rating,
      created_date: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    const result = await reviewSubmit(review);
    if (result.success) {
      setReviewStatus(`Thank you! You rated ${rating} star(s).`);
      refreshReviews();
      setTimeout(() => {
        closeForm();
      }, 2000);
    } else {
      setReviewStatus(`Review failed: ${result.error}`);
    }
  };

  const handleClick = (star) => {
    setRating((prev) => (prev === star ? 0 : star));
  };

  return (
    <div>
      <h2 className={styles.modal__title}>Write a review</h2>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <label className={styles.modal__label}>
          Review Title:
          <input className={styles.modal__text} type="text" name="title" placeholder="Title of the Review" minLength="4" required />
        </label>
        <label className={styles.modal__label}>
          Description
          <textarea className={styles.modal__description} name="description" placeholder="Type here..." required />
        </label>
        <div>
          <div className={styles.modal__rating}>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
              <span key={star} onClick={() => handleClick(star)} className={`${styles.modal__star} ${star <= rating ? styles.modal__selected : ""}`}>
                ★
              </span>
            ))}
          </div>
          <div>Current rating: {rating}</div>
        </div>
        <button className={styles.modal__button} type="submit">
          Submit
        </button>
      </form>
      {reviewStatus && <div className={styles.modal__status}>{reviewStatus}</div>}
    </div>
  );
}
