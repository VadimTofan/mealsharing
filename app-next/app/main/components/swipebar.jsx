"use client";

import styles from "@/app/main/page.module.css";

import { useRef, useEffect } from "react";

import Link from "next/link";

export default function SwipeBar() {
  const slides = [
    {
      title: "Eat Good!<br/>Not Less.",
    },
    {
      title: "We’re Real.<br/>Not Machines.",
    },
    {
      title: "Real Food.<br/>Easy Choice.",
    },
    {
      title: "You Are<br/>What You Eat.",
    },
  ];

  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let currentIndex = 0;
    const slideEls = wrapper.querySelectorAll(`.${styles.swipebar__slide}`);
    if (!slideEls.length) return;
    const slideWidth = slideEls[0].offsetWidth;

    const scrollToSlide = (idx) => {
      wrapper.scrollTo({
        left: idx * slideWidth,
        behavior: "smooth",
      });
    };

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideEls.length;
      scrollToSlide(currentIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.swipebar}>
      <div className={styles.swipebar__container}>
        <div className={styles.swipebar__wrapper} ref={wrapperRef}>
          {slides.map((slide, idx) => (
            <div className={styles.swipebar__slide} key={idx}>
              <h2 dangerouslySetInnerHTML={{ __html: slide.title }} />
              <div className={styles.swipebar__buttons}>
                <Link href="/meals" className={styles.swipebar__button}>
                  Reserve a meal now!
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
