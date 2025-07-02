import styles from "./meal.module.css";

import { useRouter } from "next/navigation";

export default function Meal({ meal }) {
  const router = useRouter();
  const mealNavigate = () => {
    router.push(`/meals/${meal.id}`);
  };
  return (
    <div onClick={mealNavigate} className={styles.meal}>
      <h2 className={styles.meal__title}>{meal.title}</h2>
      <p className={styles.meal__description}>{meal.description}</p>
      <p className={styles.meal__location}>Location: {meal.location}</p>
      <p className={styles.meal__maxReservations}>Max Reservations: {meal.max_reservations}</p>
      <p className={styles.meal__price}>Price: {meal.price}</p>
    </div>
  );
}
