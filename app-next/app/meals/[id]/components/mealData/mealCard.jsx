import styles from "./page.module.css";

import Review from "../review/review";
import Reviews from "../review/reviews";
import Reservation from "../reservation/reservation";

export default function MealCard({ meal, completeAction, refreshReviews, reviewsKey }) {
  const availableReservations = meal.max_reservations - meal.total_guests;

  return (
    <div className={`${styles.contentcard} contentcard`}>
      <div className={styles.meal__box}>
        <div className={styles.meal}>
          <h2 className={styles.meal__title}>{meal.title}</h2>
          <p className={styles.meal__text}>{meal.description}</p>
          <p className={styles.meal__text}>Location: {meal.location}</p>
          <p className={styles.meal__text}>Reservations Left: {availableReservations}</p>
          <p className={styles.meal__text}>Price: {meal.price}</p>
        </div>

        <div className={styles.meal__res}>
          <Reservation availableSlots={availableReservations} data={meal} completeAction={completeAction} />
          <Review id={meal.id} refreshReviews={refreshReviews} />
        </div>
      </div>
      <div className={styles.reviews__box}>
        <Reviews id={meal.id} key={reviewsKey} />
      </div>
    </div>
  );
}
