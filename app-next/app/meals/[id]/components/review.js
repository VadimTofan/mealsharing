"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Review({ id, refreshReviews }) {
  const [modalOpen, setModalOpen] = useState(null);

  const openForm = (formName) => setModalOpen(formName);
  const closeForm = () => setModalOpen(null);

  return (
    <>
      <button className={styles.review__button} onClick={() => openForm("review")}>
        Add review
      </button>

      {modalOpen === "review" && (
        <div className={styles.modal} id="review" style={{ display: "flex" }}>
          <div className={styles.modal__content}>
            <span className={styles.modal__close} onClick={closeForm}>
              &times;
            </span>
            <ReviewForm id={id} closeForm={closeForm} refreshReviews={refreshReviews} />
          </div>
        </div>
      )}
    </>
  );
}

async function submitReviw(reviewData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error("Review request failed");
    }

    const data = await response.json();
    console.log("Review success:", data.message);
    return { success: true, data };
  } catch (err) {
    console.error("Review error:", err.message);
    return { success: false, error: err.message };
  }
}

function ReviewForm({ id, closeForm, refreshReviews }) {
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

    const result = await submitReviw(review);
    console.log(refreshReviews);
    if (result.success) {
      setReviewStatus(`Thank you! You rated ${rating} star(s).`);
      refreshReviews();
      setTimeout(() => {
        closeForm();
      }, 1000);
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

export function Reviews({ id }) {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/reviews/${id}`);

        if (!response.ok) {
          throw new Error("Review request failed");
        }
        const data = await response.json();
        console.log("Review success:", data);
        setReviews(data);
      } catch (err) {
        console.error("Review error:", err.message);
        setError(err.message);
      }
    };
    fetchData();
  }, [id]);

  if (error) return <div className={styles.meals__error}>Error: {error}</div>;

  if (reviews === null) return <div className={styles.meals__loading}>Loading...</div>;

  const renderReviews = () => {
    if (reviews && reviews.length > 1) return reviews.map((review) => <RenderReview key={review.id} review={review} />);
    if (reviews) return <RenderReview key={reviews.id} review={reviews} />;
    return <li className={styles.meals__item}>No meals found.</li>;
  };

  return (
    <div className={styles.reviews}>
      <h2 className={styles.reviews__heading}>Recent Reviews</h2>
      <div className={styles.reviews__feedback}>
        <ul className={styles.reviews__list}>{renderReviews(reviews)}</ul>
      </div>
    </div>
  );
}

function RenderReview({ review }) {
  const createdDate = new Date(review.created_date);
  const formattedDate = createdDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.review}>
      <h2 className={styles.review__title}>{review.title}</h2>
      <p className={styles.review__description}>{review.description}</p>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
        <span key={star} className={`${styles.modal__star} ${star <= review.stars ? styles.modal__selected : ""}`}>
          ★
        </span>
      ))}
      <p className={styles.review__date}>Added on: {formattedDate}</p>
    </div>
  );
}
