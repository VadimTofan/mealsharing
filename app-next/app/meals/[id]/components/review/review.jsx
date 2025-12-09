'use client';

import styles from './page.module.scss';

import { useState } from 'react';
import { ReviewForm } from './ReviewForm';

export function Review({ id, refreshReviews }) {
  const [state, setState] = useState(null);

  const openForm = (formName) => setState(formName);
  const closeForm = () => setState(null);

  return (
    <>
      <button className={styles.review__button} onClick={() => openForm('review')}>
        Add review
      </button>

      {state === 'review' && (
        <div className={styles.modal} id="review" style={{ display: 'flex' }}>
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
