import styles from "./meal.module.css";

import { useRouter } from "next/navigation";

export default function Meal({ meal }) {
  const router = useRouter();
  const mealNavigate = () => {
    router.push(`/meals/${meal.id}`);
  };

  return (
  <div>
    <h2 className={styles.meal__title}>{meal.title}</h2>
    <div onClick={mealNavigate} className={styles.meal} style={{ backgroundImage: `url('/images/foodImages/${meal.id}.webp')` }}>
      <p className={styles.meal__location}>Location: {meal.location}</p>
      <p className={styles.meal__maxReservations}>Max Reservations: {meal.max_reservations}</p>
      <p className={styles.meal__price}>Price: {meal.price}</p>
    </div>
  </div>
  );
}
