"use client";

import styles from "./page.module.css";

import { useState } from "react";
import ReviewForm from "./ReviewForm";

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
