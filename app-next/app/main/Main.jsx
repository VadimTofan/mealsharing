'use client';

import styles from './page.module.scss';
import { useEffect, useState } from 'react';

import { SwipeBar } from './components/Swipebar';
import { MainMeals } from './components/MainMeals';
import { useMainMeals } from './components/useMainMeals';
import { LoadingComponent } from '../components/loading/Loading';
import { ErrorComponent } from '../components/error/Error';
export function Main() {
  const [state, setState] = useState(false);
  const { meals, error, loading } = useMainMeals();

  useEffect(() => {
    const handleScroll = () => setState(window.scrollY > 350);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <section className={styles.databox}>
      {state && <div className={`${styles.carrot} ${styles.carrot__show}`} />}
      <SwipeBar />
      <MainMeals meals={meals} />
    </section>
  );
}
