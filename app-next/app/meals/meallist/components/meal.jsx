import styles from "./meal.module.css";

import { useRouter } from "next/navigation";

export default function Meal({ meal, description, index }) {
  const router = useRouter();
  const mealNavigate = () => {
    router.push(`/meals/${meal.id}`);
  };

  const contentClassName = `${styles.meal__content} ${index % 2 === 1 ? styles["meal__content--reverse"] : ""}`;

  return (
    <div className={styles.meal__card}>
      <div className={styles.meal__header}>
        <h2 className={styles.meal__title}>{meal.title}</h2>
        <h2 className={styles.meal__price}>{meal.price} DKK</h2>
      </div>
      <div className={contentClassName}>
        <div
          onClick={mealNavigate}
          className={`${styles.meal} meal`}
          style={{
            backgroundImage: `url('/images/foodImages/${meal.id}.webp')`,
          }}
        />
        {description && <p className={styles.meal__description}>{meal.description}</p>}
      </div>
    </div>
  );
}
