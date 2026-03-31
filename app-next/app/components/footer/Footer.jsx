import styles from './page.module.scss';

import Link from 'next/link';
import Image from 'next/image';

import { SocialMedias } from './components/SocialMedia';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__intro}>
        <p className={styles.footer__eyebrow}>Mealsharing</p>
        <h2 className={styles.footer__title}>Find a seat. Meet the table.</h2>
        <p className={styles.footer__copy}>
          A cleaner way to discover shared meals, manage reservations, and keep the social side of
          dining alive.
        </p>
      </div>
      <SocialMedias />
      <Link
        className={styles.footer__maplink}
        href="https://maps.app.goo.gl/aanF3tBXJzpfWBHE9"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className={styles.footer__map}
          src="/images/googlemaps.png"
          alt="Open the location in Google Maps"
          width={120}
          height={120}
        />
      </Link>
    </footer>
  );
}
