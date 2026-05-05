import styles from '../page.module.scss';

import Link from 'next/link';
import Image from 'next/image';

const socialMedias = [
  {
    img: '/images/linkedin.png',
    link: 'https://www.linkedin.com/in/vadim-tofan',
    name: 'LinkedIn',
  },
  {
    img: '/images/github.gif',
    link: 'https://github.com/VadimTofan',
    name: 'GitHub',
  },
  {
    img: '/images/mainlogo.png',
    link: 'mailto:vad.tofan@gmail.com',
    name: 'Email',
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
