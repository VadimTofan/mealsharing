'use client';

import React, { useState } from 'react';

import { FetchMeal } from './components/mealdata/FetchData';
import { MealCard } from './components/mealdata/MealCard';
import { Loading } from '@/app/components/loading/Loading';
import { Error } from '@/app/components/error/Error';

export default function MealsId({ params }) {
  const { id } = React.use(params);
  const { meal, error, isLoading, refreshMeal } = FetchMeal(id);

  const [reviews, setReviews] = useState(0);

  const refreshReviews = () => {
    setReviews((prev) => prev + 1);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <MealCard
      meal={meal}
      refreshMeals={refreshMeal}
      refreshReviews={refreshReviews}
      reviews={reviews}
    />
  );
}
