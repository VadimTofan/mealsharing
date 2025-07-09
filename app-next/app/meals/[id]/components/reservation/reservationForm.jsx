"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { ReservationSubmit } from "./reservationSubmit";

export default function ReservationForm({ availableSlots, data, completeAction, closeForm }) {
  const [reservationStatus, setReservationStatus] = useState(null);
  const meal = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const reservation = {
      number_of_guests: formData.get("guests"),
      meal_id: meal.id,
      created_date: new Date().toISOString().slice(0, 19).replace("T", " "),
      contact_phonenumber: formData.get("phone"),
      contact_name: formData.get("fullName"),
      contact_email: formData.get("email"),
    };

    const result = await ReservationSubmit(reservation);

    if (result.success) {
      setReservationStatus({ type: "success", message: "Reservation successful!" });
      completeAction();
      setTimeout(() => {
        closeForm();
      }, 2000);
    } else {
      setReservationStatus({ type: "error", message: `Reservation failed: ${result.error}` });
    }
  };

  return (
    <div>
      <h2 className={styles.modal__title}>Reserve this meal</h2>

      {reservationStatus?.type === "success" ? (
        <div className={`${styles.modal__status} ${styles.success}`}>{reservationStatus.message}</div>
      ) : (
        <form className={styles.modal__form} onSubmit={handleSubmit}>
          <label className={styles.modal__label}>
            Full Name:
            <input className={styles.modal__text} type="text" name="fullName" placeholder="Your Full Name" minLength="4" required />
          </label>

          <label className={styles.modal__label}>
            Reservation:
            {!availableSlots ? (
              <p className={styles.modal__status}>Sold out!</p>
            ) : (
              <select name="guests" required>
                {[...Array(Number(availableSlots))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            )}
          </label>

          <label className={styles.modal__label}>
            E-mail:
            <input className={styles.modal__text} type="email" name="email" placeholder="example@gmail.com" minLength="4" required />
          </label>

          <label className={styles.modal__label}>
            Phone Number:
            <input className={styles.modal__text} type="text" name="phone" placeholder="+45 12345678" minLength="8" required />
          </label>

          <button className={styles.modal__button} type="submit">
            Submit
          </button>
        </form>
      )}

      {reservationStatus?.type === "error" && <div className={`${styles.modal__status} ${styles.error}`}>{reservationStatus.message}</div>}
    </div>
  );
}
