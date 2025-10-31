import styles from "./page.module.scss";
import Review from "../review/Review";
import Reviews from "../review/Reviews";
import Reservation from "../reservation/Reservation";

export default function MealCard({ meal, completeAction, refreshReviews, reviewsKey }) {
  const availableReservations = meal.max_reservations - meal.total_guests;

  const mealInfo = [
    { label: "Location", value: meal.location },
    { label: "Reservations Left", value: availableReservations },
    { label: "Price", value: meal.price },
  ];

  return (
    <div className={`${styles.contentcard} contentcard`}>
      <div className={styles.meal__box}>
        <div className={styles.meal}>
          <h2 className={styles.meal__title}>{meal.title}</h2>
          <p className={styles.meal__text}>{meal.description}</p>

          <div className={styles.meal__info}>
            {mealInfo.map((info, index) => (
              <p className={styles.meal__text} key={index}>
                {info.label}: {info.value}
              </p>
            ))}
          </div>
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
