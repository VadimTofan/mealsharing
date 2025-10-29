"use client";

import styles from "./page.module.css";

import { useState } from "react";

import ReservationForm from "./ReservationForm";

export default function Reservation({ availableSlots, data, completeAction }) {
  const [modalOpen, setModalOpen] = useState(null);

  const openForm = (formName) => setModalOpen(formName);
  const closeForm = () => setModalOpen(null);

  return (
    <>
      <button className={styles.reservation__button} onClick={() => openForm("reservation")}>
        Reserve
      </button>

      {modalOpen === "reservation" && (
        <div className={styles.modal} id="reservation" style={{ display: "flex" }}>
          <div className={styles.modal__content}>
            <span className={styles.modal__close} onClick={closeForm}>
              &times;
            </span>
            <ReservationForm availableSlots={availableSlots} data={data} completeAction={completeAction} closeForm={closeForm} />
          </div>
        </div>
      )}
    </>
  );
}
