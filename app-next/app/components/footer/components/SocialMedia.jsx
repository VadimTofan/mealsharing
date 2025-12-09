import styles from '../page.module.scss';

import Link from 'next/link';

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
    <div className={styles.footer__socials}>
      <h3 className={styles.footer__heading}>Follow us on social media:</h3>
      <ul className={styles.footer__links}>
        {socialMedias.map(({ img, link, name }) => (
          <SocialMedia key={name} img={img} link={link} name={name} />
        ))}
      </ul>
    </div>
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
        <img src={img} alt={name} className={styles.footer__image} title={name} />
        {name}
      </Link>
    </li>
  );
}
