import styles from '../page.module.scss';

import Link from 'next/link';
import Image from 'next/image';

const socialMedias = [
  {
    img: '/images/linkedin.png',
    link: 'https://www.linkedin.com/school/hackyourfuture-denmark/',
    name: 'LinkedIn',
  },
  {
    img: '/images/instagram.png',
    link: 'https://www.instagram.com/hackyourfuture.dk',
    name: 'Instagram',
  },
  {
    img: '/images/facebook.png',
    link: 'https://www.facebook.com/hackyourfuturedenmark',
    name: 'Facebook',
  },
  {
    img: '/images/youtube.png',
    link: 'https://www.youtube.com/@hackyourfuturedenmark8032',
    name: 'YouTube',
  },
  {
    img: '/images/github.gif',
    link: 'https://github.com/hackyourfuture-cph',
    name: 'GitHub',
  },
];

export function SocialMedias() {
  return (
    <nav className={styles.footer__socials} aria-label="Social media">
      <h3 className={styles.footer__heading}>Keep in touch</h3>
      <ul className={styles.footer__links}>
        {socialMedias.map(({ img, link, name }) => (
          <SocialMedia key={name} img={img} link={link} name={name} />
        ))}
      </ul>
    </nav>
  );
}

export function SocialMedia({ img, link, name }) {
  return (
    <li className={styles.footer__item}>
      <Link
        className={styles.footer__link}
        href={link}
        title={name}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={img} alt="" className={styles.footer__image} title={name} width={32} height={32} />
        {name}
      </Link>
    </li>
  );
}
