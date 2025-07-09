"use client";

import { useState, useEffect } from "react";

export default function fetchData(id) {
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMealData = async () => {
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
  };
  console.log(meal);

  useEffect(() => {
    fetchMealData();
  }, [id]);

  return { meal, error, isLoading, refreshMeal: fetchMealData };
}
