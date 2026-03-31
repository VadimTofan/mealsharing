'use client';

import styles from '@/app/main/page.module.scss';
import { useEffect, useState } from 'react';

export function SwipeBar() {
  const slides = [
    { title: 'Hosted dinners', copy: 'Chef-led meals with character, not generic booking cards.' },
    { title: 'Fast booking', copy: 'Reserve a seat, manage your plans, and skip the friction.' },
    { title: 'Useful reviews', copy: 'See how past guests rated the food, host, and overall vibe.' },
    { title: 'Local feel', copy: 'Find casual shared meals that feel closer to a dinner invite.' },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className={styles.swipebar}>
      <div className={styles.swipebar__heading}>
        <p className={styles.swipebar__eyebrow}>Why it feels better</p>
        <h2 className={styles.swipebar__title}>Built for real dinners, not sterile listings.</h2>
      </div>
      <div className={styles.swipebar__wrapper}>
        {slides.map((slide, idx) => (
          <article
            key={slide.title}
            className={`${styles.swipebar__slide} ${idx === activeIndex ? styles.swipebar__slideActive : ''}`}
          >
            <h3 className={styles.swipebar__cardTitle}>{slide.title}</h3>
            <p className={styles.swipebar__copy}>{slide.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
