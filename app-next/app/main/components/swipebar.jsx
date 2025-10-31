"use client";

import styles from "@/app/main/page.module.scss";
import { useRef, useEffect } from "react";
import Link from "next/link";

export default function SwipeBar() {
  const slides = [{ title: ["Eat Good!", "Not Less."] }, { title: ["We’re Real.", "Not Machines."] }, { title: ["Real Food.", "Easy Choice."] }, { title: ["You Are", "What You Eat."] }];

  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const slideEls = wrapper.querySelectorAll(`.${styles.swipebar__slide}`);
    if (!slideEls.length) return;

    let currentIndex = 0;

    const scrollToSlide = (idx) => {
      const slideWidth = slideEls[0].offsetWidth;
      wrapper.scrollTo({
        left: idx * slideWidth,
        behavior: "smooth",
      });
    };

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideEls.length;
      scrollToSlide(currentIndex);
    }, 5000);

    const handleResize = () => scrollToSlide(currentIndex);
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.swipebar}>
      <div className={styles.swipebar__container}>
        <div className={styles.swipebar__wrapper} ref={wrapperRef}>
          {slides.map((slide, idx) => (
            <div className={styles.swipebar__slide} key={idx}>
              <h2 className={styles.swipebar__heading}>
                {slide.title.map((line, i) => (
                  <span key={i} className={styles.swipebar__line}>
                    {line}
                  </span>
                ))}
              </h2>
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
