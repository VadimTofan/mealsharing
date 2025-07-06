import styles from "./components/main/page.module.css";

import Main from "./components/main/main.jsx";

import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <div className={styles.intro}>
        <video id="bgvideo" className={styles.bgvideo} autoPlay muted loop>
          <source src="/mainvideo.mp4" type="video/mp4" />
        </video>
      </div>
      <Main />
      <div className={styles.outro}>
        <Image src="/images/cuttingboard.webp" alt="Cutting board" className={styles.bgimage} width={500} height={300} />
      </div>
    </>
  );
}
