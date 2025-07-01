import styles from "./meal.module.css";

export default function Meal({ meal }) {
  return (
    <div className={styles.meal}>
      <h2 className={styles.meal__title}>{meal.title}</h2>
      <p className={styles.meal__description}>{meal.description}</p>
      <p className={styles.meal__location}>Location: {meal.location}</p>
      <p className={styles.meal__maxReservations}>Max Reservations: {meal.max_reservations}</p>
      <p className={styles.meal__price}>Price: {meal.price}</p>
    </div>
  );
}
