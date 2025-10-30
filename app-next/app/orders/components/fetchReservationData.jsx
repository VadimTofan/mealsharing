"use client";

import { useState, useEffect, useCallback } from "react";

export default function useReservationData(userId) {
  const [mealIds, setMealIds] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  const fetchReservationData = useCallback(
    async (showLoading = true) => {
      if (!userId) return;

      if (showLoading) setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/reservationsbyuser/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch reservations");

        const data = await response.json();
        setMealIds(data);
        setError(null);
        setHasFetchedOnce(true);
      } catch (err) {
        setError(err.message);
      } finally {
        if (showLoading) setIsLoading(false);
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
