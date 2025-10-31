"use client";

import { useState, useEffect, useCallback } from "react";

export default function FetchMeal(id) {
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMealData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/selectedmeal/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch meal");
      }
      const data = await response.json();
      setMeal(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchMealData();
  }, [fetchMealData, id]);

  return { meal, error, isLoading, refreshMeal: fetchMealData };
}
