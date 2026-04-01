import styles from './page.module.scss';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { CancelReservation } from '@/app/orders/components/CancelReservation';

export function Meal({ meal, description = false, userdata }) {
  const router = useRouter();
  const pathname = usePathname();
  const reserved = userdata?.includes(Number(meal.id));
  const formattedPrice = `${parseInt(meal.price, 10)},-`;
  const rating = Number(meal.average_stars ?? 0);

  const mealNavigate = () => {
    router.push(`/meals/${meal.id}`);
  };

  function getReservationClass(reservations) {
    if (reservations >= 15) return styles.meal__reservation;
    if (reservations > 5 && reservations < 15) return styles.meal__reservationTwo;
    return styles.meal__reservationThree;
  }

  return (
    <article className={styles.meal__card}>
      <button
        type="button"
        onClick={mealNavigate}
        className={styles.meal__media}
        aria-label={`Open details for ${meal.title}`}
      >
        <Image
          src={`/images/foodImages/${meal.id}.webp`}
          alt={meal.title}
          fill
          sizes="(max-width: 744px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.meal__image}
        />
        <div className={styles.meal__overlay} />
        {reserved && <div className={styles.meal__ribbon}>Reserved</div>}
      </button>

      <div className={styles.meal__body}>
        <div className={styles.meal__header}>
          <div className={styles.meal__headline}>
            <p className={styles.meal__eyebrow}>Meal #{meal.id}</p>
            <h2 className={styles.meal__title}>{meal.title}</h2>
          </div>
          <p className={styles.meal__price}>{formattedPrice}</p>
        </div>

        {description && <p className={styles.meal__description}>{meal.description}</p>}

        <div className={styles.meal__stats}>
          <div className={styles.meal__stars} aria-label={`Rated ${rating} out of 5`}>
            {Array.from({ length: 5 }, (_, index) => {
              const starNumber = index + 1;

              return (
                <span
                  key={starNumber}
                  className={`${styles.meal__star} ${starNumber <= rating ? styles.meal__selected : ''}`}
                >
                  ★
                </span>
              );
            })}
          </div>

          <div className={styles.meal__locationbox}>
            <img className={styles.meal__pin} src="/images/pin.png" alt="" />
            <Link
              href={`https://www.google.com/maps?q=${encodeURIComponent(meal.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.meal__location}
            >
              {meal.location}
            </Link>
          </div>
        </div>

        <div className={styles.meal__meta}>
          <p className={getReservationClass(meal.available_reservations)}>
            Reservations left: {meal.available_reservations}
          </p>
          {reserved && <p className={styles.meal__isReserved}>Already reserved</p>}
        </div>

        <div className={styles.meal__actions}>
          {pathname === '/orders' ? (
            <CancelReservation mealId={meal.id} />
          ) : (
            <button type="button" onClick={mealNavigate} className={styles.meal__button}>
              Read details
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
