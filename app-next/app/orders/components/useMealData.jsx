'use client';

import { useState, useEffect } from 'react';

export function useMealsData(ids) {
  const [state, setState] = useState({ meals: null, error: null });
  const { meals, error } = state;

  const idsKey = Array.isArray(ids) ? ids.join(',') : (ids ?? '');

  useEffect(() => {
    if (!idsKey) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, error: null }));
        setState((prev) => ({ ...prev, meals: null }));

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_ACCESS}/api/selectedmeals/${idsKey}`,
          { signal }
        );

        if (!response.ok) throw new Error('Failed to fetch meals');

        const data = await response.json();
        setState((prev) => ({ ...prev, meals: data }));
      } catch (err) {
        if (err.name === 'AbortError') return;
        setState((prev) => ({ ...prev, error: err.message }));
      }
    };

    fetchData();

    return () => controller.abort();
  }, [idsKey]);

  return { meals, error };
}
