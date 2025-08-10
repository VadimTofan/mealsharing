"use client";
import styles from "../page.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/components/header/components/AuthContext";
import useReservationData from "./fetchReservationData";

export default function CancelReservation({ mealId }) {
  const { user } = useContext(AuthContext);
  const { mealIds, refreshReservations } = useReservationData(user?.id);

  const [showConfirm, setShowConfirm] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleCancel = () => {
    setShowConfirm(true);
    setStatusMessage("");
    setStatusType("");
  };

  const confirmCancel = async () => {
    const reservation = mealIds?.find((item) => item.meal_id === mealId);

    if (!reservation) {
      setStatusMessage("No reservation found for this meal.");
      setStatusType("error");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/reservations/${reservation.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Could not delete reservation");

      setStatusMessage("Reservation cancelled successfully!");
      setStatusType("success");
      setTimeout(async () => {
        await refreshReservations();
        setShowConfirm(false);
        setStatusMessage("");
        setStatusType("");

        setTimeout(() => {
          window.location.reload();
        }, 50);
      }, 2000);
    } catch (err) {
      console.error("Error cancelling reservation:", err.message);
      setStatusMessage("Failed to cancel reservation. Please try again.");
      setStatusType("error");
    }
  };

  return (
    <>
      <button onClick={handleCancel} className={styles.orders__button}>
        Cancel Reservation
      </button>

      {showConfirm && (
        <div className={styles.modal}>
          <div className={styles.modal__content}>
            <h2 className={styles.modal__title}>{statusType ? "" : "Are you sure you want to cancel this reservation?"}</h2>

            {!statusType && (
              <div className={styles.modal__buttons}>
                <button onClick={confirmCancel} className={styles.modal__button}>
                  Yes, cancel
                </button>
                <button onClick={() => setShowConfirm(false)} className={styles.modal__button}>
                  No, go back
                </button>
              </div>
            )}

            {statusMessage && <div className={`${styles.modal__status} ${styles[statusType]}`}>{statusMessage}</div>}
          </div>
        </div>
      )}
    </>
  );
}
