'use client';

import styles from './page.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { SwipeBar } from './components/Swipebar';
import { MainMeals } from './components/MainMeals';
import { useMainMeals } from './components/useMainMeals';
import { LoadingComponent } from '../components/loading/Loading';
import { ErrorComponent } from '../components/error/Error';

export function Main() {
  const [showAccent, setShowAccent] = useState(false);
  const { meals, error, loading } = useMainMeals();

  useEffect(() => {
    const handleScroll = () => setShowAccent(window.scrollY > 280);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div className={styles.home}>
      <section className={`${styles.hero} surface-card`}>
        <video className={styles.hero__video} autoPlay muted loop playsInline preload="auto">
          <source src="/mainvideo.mp4" type="video/mp4" />
        </video>
        <div className={styles.hero__veil} />
        <div className={styles.hero__content}>
          <p className={styles.hero__eyebrow}>Community dining, redesigned</p>
          <h1 className={styles.hero__title}>Eat well together.</h1>
          <p className={styles.hero__copy}>
            Browse hosted dinners, book your seat in seconds, and turn a regular evening into a
            better kind of social plan.
          </p>
          <div className={styles.hero__actions}>
            <Link href="/meals" className={styles.hero__primary}>
              Explore meals
            </Link>
            <Link href="/orders" className={styles.hero__secondary}>
              View reservations
            </Link>
          </div>
          <div className={styles.hero__stats}>
            <div className={styles.hero__stat}>
              <span className={styles.hero__value}>{meals?.length ?? 0}</span>
              <span className={styles.hero__label}>meals available now</span>
            </div>
            <div className={styles.hero__stat}>
              <span className={styles.hero__value}>Fresh</span>
              <span className={styles.hero__label}>new hosts and menus</span>
            </div>
            <div className={styles.hero__stat}>
              <span className={styles.hero__value}>Easy</span>
              <span className={styles.hero__label}>booking and review flow</span>
            </div>
          </div>
        </div>
      </section>

      {showAccent && <div className={`${styles.carrot} ${styles.carrot__show}`} aria-hidden="true" />}

      <SwipeBar />
      <MainMeals meals={meals} />
    </div>
  );
}
