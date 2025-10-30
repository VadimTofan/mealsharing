import styles from "./page.module.scss";

import SocialMedias from "./components/SocialMedia";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <SocialMedias />
      <a href="https://maps.app.goo.gl/aanF3tBXJzpfWBHE9" target="_blank">
        <img className={styles.footer__map} src="/images/googlemaps.png" alt="location on map" />
      </a>
    </footer>
  );
}
