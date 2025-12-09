'use client';

import styles from './page.module.scss';
import { useEffect, useState } from 'react';

import { SwipeBar } from './components/Swipebar';
import { MainMeals } from './components/MainMeals';

export function Main() {
  const [state, setState] = useState(false);

  useEffect(() => {
    const handleScroll = () => setState(window.scrollY > 350);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.databox}>
      <div className={`${styles.carrot} ${state && styles.carrot__show}`} />
      <SwipeBar />
      <MainMeals />
    </div>
  );
}
