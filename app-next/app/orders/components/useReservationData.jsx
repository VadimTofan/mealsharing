'use client';

import { useState, useEffect, useCallback } from 'react';

export function useReservationData(userId) {
  const [state, setState] = useState({
    mealIds: null,
    error: null,
    isLoading: false,
    hasFetchedOnce: false,
  });

  const { mealIds, error, isLoading, hasFetchedOnce } = state;

  const fetchReservationData = useCallback(
    async (showLoading = true) => {
      if (!userId) return;
      if (showLoading) setState((prev) => ({ ...prev, isLoading: true }));

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_ACCESS}/api/reservationsbyuser/${userId}`
        );
        if (!response.ok) throw new Error('Failed to fetch reservations');

        const data = await response.json();
        setState((prev) => ({ ...prev, mealIds: data, error: null, hasFetchedOnce: true }));
      } catch (err) {
        setState((prev) => ({ ...prev, error: err.message }));
      } finally {
        if (showLoading) setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [userId]
  );

  useEffect(() => {
    fetchReservationData();
  }, [fetchReservationData]);

  const refreshReservations = async () => {
    await fetchReservationData(false);
  };

  return {
    mealIds,
    error,
    isLoading: !hasFetchedOnce && isLoading,
    refreshReservations,
  };
}
