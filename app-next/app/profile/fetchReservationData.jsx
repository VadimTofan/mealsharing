"use client";

import { useState, useEffect } from "react";

export default function useReservationData(userId) {
  const [mealIds, setMealIds] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchReservationData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/reservationsbyuser/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch reservations");

        const data = await response.json();
        setMealIds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservationData();
  }, [userId]);

  return { mealIds, error, isLoading };
}
