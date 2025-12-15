'use client';

import React from 'react';

import { useMeal } from './components/mealData/useMeal';
import { MealCard } from './components/mealData/MealCard';
import { LoadingComponent } from '@/app/components/loading/Loading';
import { ErrorComponent } from '@/app/components/error/Error';

export default function MealsId({ params }) {
  const { id } = React.use(params);
  const meal = useMeal(id);
  const { hasError, isLoading } = meal;

  if (isLoading) return <LoadingComponent />;
  if (hasError) return <ErrorComponent error={hasError} />;
  return <MealCard mealData={meal} />;
}
