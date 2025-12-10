'use client';

import React, { useState } from 'react';

import { FetchMeal } from './components/mealdata/FetchData';
import { MealCard } from './components/mealdata/MealCard';

export default function MealsId({ params }) {
  const { id } = React.use(params);
  const meal = FetchMeal(id);

  return <MealCard mealData={meal} />;
}
