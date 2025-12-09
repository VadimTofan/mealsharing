import styles from '@/app/main/page.module.scss';

import { Main } from '@/app/main/Main';

export default function HomePage() {
  return (
    <>
      <div className={styles.main}>
        <video
          id="bgvideo"
          className={styles.main__bgvideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/mainvideo.mp4" type="video/mp4" />
        </video>
      </div>
      <Main />
    </>
  );
}
