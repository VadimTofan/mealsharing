import styles from "./meal.module.css";

import { useRouter } from "next/navigation";

export default function Meal({ meal }) {
  const router = useRouter();
  const mealNavigate = () => {
    router.push(`/meals/${meal.id}`);
  };

  return (
    <div>
      <div className={styles.meal__header}>
        <h2 className={styles.meal__title}>{meal.title}</h2>
        <h2 className={styles.meal__price}>{meal.price} DKK</h2>
      </div>
      <div onClick={mealNavigate} className={styles.meal} style={{ backgroundImage: `url('/images/foodImages/${meal.id}.webp')` }}></div>
    </div>
  );
}
