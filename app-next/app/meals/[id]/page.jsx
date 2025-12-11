'use client';

import React from 'react';

import { useMeal } from './components/mealdata/useData';
import { MealCard } from './components/mealdata/MealCard';

export default function MealsId({ params }) {
  const { id } = React.use(params);
  const meal = useMeal(id);

  return <MealCard mealData={meal} />;
}
