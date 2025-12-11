'use client';

import { useState, useEffect } from 'react';

export function useMealsData(ids) {
  const [meals, setMeals] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ids || !ids.length) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_ACCESS}/api/selectedmeals/${ids}`
        );

        if (!response.ok) throw new Error('Failed to use meals');

        const data = await response.json();
        setMeals(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [ids]);

  return { meals, error };
}
