'use client';

import styles from './page.module.scss';

import { MealList } from './components/mealList/MealList';

import { useState, useEffect } from 'react';

export default function Meals() {
  const [showTortilla, setShowTortilla] = useState(false);
  const [showBeans, setShowBeans] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTortilla(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBeans(window.scrollY > 700);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {showTortilla ? <div className={`${styles.tortilla__show} ${styles.tortilla}`} /> : ''}
      {showBeans ? <div className={`${styles.beans__show} ${styles.beans}`} /> : ''}
      <MealList add="description" />
    </>
  );
}
