import styles from './page.module.scss';

export function ReviewRender({ review }) {
  const createdDate = new Date(review.created_date);
  const formattedDate = createdDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.review}>
      <h2 className={styles.review__title}>{review.title}</h2>
      <p className={styles.review__description}>{review.description}</p>
      <div>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
          <span
            key={star}
            className={`${styles.modal__star} ${star <= review.stars ? styles.modal__selected : ''}`}
          >
            ★
          </span>
        ))}
      </div>
      <p className={styles.review__date}>Added on: {formattedDate}</p>
    </div>
  );
}
