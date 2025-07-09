import styles from "./meal.module.css";

import { useRouter } from "next/navigation";

import Reservation from "@/app/meals/[id]/components/reservation/reservation";

export default function Meal({ meal, description }) {
  const router = useRouter();
  const mealNavigate = () => {
    router.push(`/meals/${meal.id}`);
  };

  const formattedPrice = `${parseInt(meal.price)},-`;

  return (
    <div className={description ? styles.meal__card : ""}>
      <div className={styles.meal__header}>
        <h2 className={styles.meal__title}>{meal.title}</h2>
        <h2 className={styles.meal__price}>{formattedPrice}</h2>
      </div>
      <div className={styles.meal__content}>
        <div
          onClick={mealNavigate}
          className={`${styles.meal} meal`}
          style={{
            backgroundImage: `url('/images/foodImages/${meal.id}.webp')`,
          }}
        />
        {description && (
          <div className={styles.meal__about}>
            <p className={styles.meal__description}>{meal.description}</p>
            <div>
              <div className={styles.meal__stats}>
                <div className={styles.meal__stars}>
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                    <span key={star} className={`${styles.meal__star} ${star <= meal.average_stars ? styles.meal__selected : ""}`}>
                      ★
                    </span>
                  ))}
                </div>
                <div className={styles.meal__locationbox}>
                  <img className={styles.meal__pin} src="/images/pin.png" />
                  <p className={styles.meal__location}>{meal.location}</p>
                </div>
              </div>
              <p className={styles.meal__reservation}>Availabile: {meal.available_reservations}</p>
              <div className={styles.meal__buttons}>
                <Reservation data={meal} />
                <button onClick={mealNavigate} className={styles.meal__button}>
                  Read more
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
