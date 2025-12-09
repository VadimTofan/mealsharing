import styles from './page.module.scss';

import { Review } from '../review/Review';
import { Reviews } from '../review/Reviews';
import { Reservation } from '../reservation/Reservation';

export function MealCard({ meal, refreshMeals, refreshReviews, reviews }) {
  const slots = meal.max_reservations - meal.total_guests;

  const mealInfo = [
    { label: 'Location', value: meal.location },
    { label: 'Reservations Left', value: slots },
    { label: 'Price', value: meal.price },
  ];

  return (
    <div className={styles.contentcard}>
      <div className={styles.reviews__box}>
        <Reviews id={meal.id} key={reviews} />
      </div>
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
          <Reservation meal={meal} slots={slots} refreshMeals={refreshMeals} />
          <Review id={meal.id} refreshReviews={refreshReviews} />
        </div>
      </div>
    </div>
  );
}
