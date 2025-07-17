import styles from "./page.module.css";

import { useRouter, usePathname } from "next/navigation";

import CancelReservation from "@/app/orders/components/cancelReservation";

export default function Meal({ meal, description, userdata, onReservationCancel }) {
  const router = useRouter();

  const pathname = usePathname();

  const mealNavigate = () => {
    router.push(`/meals/${meal.id}`);
  };

  const reserved = userdata?.includes(Number(meal.id));

  const formattedPrice = `${parseInt(meal.price)},-`;

  function getReservationClass(reservations) {
    if (reservations >= 15) return styles.meal__reservation;
    if (reservations > 5) return styles.meal__reservationTwo;
    return styles.meal__reservationThree;
  }

  return (
    <div className={styles.meal__card}>
      {reserved && <div className={styles.meal__ribbon} />}
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
                  <a href={`https://www.google.com/maps?q=${meal.location}`} target="_blank" className={styles.meal__location}>
                    {meal.location}
                  </a>
                </div>
              </div>
              <div className={styles.meal__locationbox}>
                <p className={getReservationClass(meal.available_reservations)}>Available: {meal.available_reservations}</p>
                {reserved && <p className={styles.meal__isReserved}>Reserved by you!</p>}
              </div>
              {pathname === "/orders" ? (
                <CancelReservation mealId={meal.id} onCancelSuccess={onReservationCancel} />
              ) : (
                <div className={styles.meal__buttons}>
                  <button onClick={mealNavigate} className={styles.meal__button}>
                    Read more
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
