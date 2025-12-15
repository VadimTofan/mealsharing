'use client';

import { useState, useEffect } from 'react';

export function useMainMeals() {
  const [state, setState] = useState({
    meals: [],
    error: null,
    loading: true,
  });

  const { meals, error, loading } = state;

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/top-meals`);
      if (!response.ok) throw new Error('Failed to use meals');
      const data = await response.json();
      setState((prev) => ({ ...prev, meals: data }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: err.message }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { meals, error, loading };
}
