'use client';

import { useState, useEffect, useCallback } from 'react';

export function FetchMeal(id) {
  const [state, setState] = useState({ meal: null, hasEerror: null, isLoading: true });
  const { meal, hasError, isLoading } = state;

  const fetchMealData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/selectedmeal/${id}`);
      if (!response.ok) throw new Error('Failed to fetch meal');

      const data = await response.json();
      setState((prev) => ({ ...prev, meal: data }));
    } catch (error) {
      setState((prev) => ({ ...prev, hasError: error.message }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchMealData();
  }, [fetchMealData, id]);

  return { meal, hasError, isLoading, refreshMeals: fetchMealData };
}
