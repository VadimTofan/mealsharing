import styles from "@/app/main/page.module.css";

import Main from "@/app/main/Main";

export default function HomePage() {
  return (
    <>
      <div className={styles.intro}>
        <video id="bgvideo" className={styles.bgvideo} autoPlay muted loop playsInline preload="auto">
          <source src="/mainvideo.mp4" type="video/mp4" />
        </video>
      </div>
      <Main />
    </>
  );
}
