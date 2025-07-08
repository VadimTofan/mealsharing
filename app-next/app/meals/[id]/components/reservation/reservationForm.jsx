"use client";

import styles from "./page.module.css";

import { useState } from "react";

import { ReservationSubmit } from "./reservationsubmit";

export default function ReservationForm({ availableSlots, data, completeAction, closeForm }) {
  const [reservationStatus, setReservationStatus] = useState(null);
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
      setReservationStatus("Reservation successful!");
      completeAction();
      setTimeout(() => {
        closeForm();
      }, 5000);
    } else {
      setReservationStatus(`Reservation failed: ${result.error}`);
    }
  };

  const meal = data;
  const availableReservations = availableSlots;
  return (
    <div>
      <h2 className={styles.modal__title}>Reserve This Meal</h2>
      {reservationStatus === "Reservation successful!" ? (
        <div className={styles.modal__status}>{reservationStatus}</div>
      ) : (
        <form className={styles.modal__form} onSubmit={handleSubmit}>
          <label className={styles.modal__label}>
            Full Name:
            <input className={styles.modal__text} type="text" name="fullName" placeholder="Your Full Name" minLength="4" required />
          </label>
          <label className={styles.modal__label}>
            Reservation:
            {availableReservations === 0 ? (
              <p className={styles.modal__status}>Sold out!</p>
            ) : (
              <select name="guests" required>
                {[...Array(availableReservations)].map((_, i) => (
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
      {reservationStatus && reservationStatus !== "Reservation successful!" && <div className={styles.modal__status}>{reservationStatus}</div>}
    </div>
  );
}
