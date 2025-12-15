'use client';
import styles from '../page.module.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '@/app/components/header/components/AuthContext';
import { useReservationData } from './useReservationData';

export function CancelReservation({ mealId }) {
  const { user } = useContext(AuthContext);
  const { mealIds, refreshReservations } = useReservationData(user?.id);
  const [state, setState] = useState({ showConfirm: false, statusMessage: '', statusType: '' });

  const { showConfirm, statusMessage, statusType } = state;

  const handleCancel = () => {
    setState((prev) => ({ ...prev, showConfirm: true }));
  };

  const confirmCancel = async () => {
    const reservation = mealIds?.find((item) => item.meal_id === mealId);

    if (!reservation)
      return setState((prev) => ({
        ...prev,
        statusMessage: 'No reservation found for this meal.',
        statusType: 'error',
      }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_ACCESS}/api/reservations/${reservation.id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) throw new Error('Could not delete reservation');

      setState((prev) => ({
        ...prev,
        statusMessage: 'Reservation cancelled successfully!',
        statusType: 'success',
      }));

      setTimeout(async () => {
        await refreshReservations();
        setState((prev) => ({ ...prev, showConfirm: false, statusMessage: '', statusType: '' }));

        setTimeout(() => {
          window.location.reload();
        }, 50);
      }, 2000);
    } catch (err) {
      console.error('Error cancelling reservation:', err.message);
      setState((prev) => ({
        ...prev,
        statusMessage: 'Failed to cancel reservation. Please try again.',
        statusType: 'error',
      }));
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
            <h2 className={styles.modal__title}>
              {statusType ? '' : 'Are you sure you want to cancel this reservation?'}
            </h2>

            {!statusType && (
              <div className={styles.modal__buttons}>
                <button onClick={confirmCancel} className={styles.modal__button}>
                  Yes, cancel
                </button>
                <button
                  onClick={() => setState((prev) => ({ ...prev, showConfirm: false }))}
                  className={styles.modal__button}
                >
                  No, go back
                </button>
              </div>
            )}

            {statusMessage && (
              <div className={`${styles.modal__status} ${styles[statusType]}`}>{statusMessage}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
