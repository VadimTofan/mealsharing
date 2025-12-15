import styles from './page.module.scss';

import Link from 'next/link';

import { SocialMedias } from './components/SocialMedia';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <SocialMedias />
      <Link
        href="https://maps.app.goo.gl/aanF3tBXJzpfWBHE9"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className={styles.footer__map} src="/images/googlemaps.png" alt="location on map" />
      </Link>
    </footer>
  );
}
