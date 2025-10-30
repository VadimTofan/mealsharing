import styles from "../page.module.scss";

export default function SocialMedias() {
  return (
    <div className={styles.footer__socials}>
      <h3 className={styles.footer__heading}>Follow us on social media:</h3>
      <ul className={styles.footer__links}>
        <SocialMedia img="/images/linkedin.png" link="https://www.linkedin.com/school/hackyourfuture-denmark/" name="LinkedIn" />
        <SocialMedia img="/images/instagram.png" link="https://www.instagram.com/hackyourfuture.dk" name="Instagram" />
        <SocialMedia img="/images/facebook.png" link="https://www.facebook.com/hackyourfuturedenmark" name="Facebook" />
        <SocialMedia img="/images/youtube.png" link="https://www.youtube.com/@hackyourfuturedenmark8032" name="YouTube" />
        <SocialMedia img="/images/github.gif" link="https://github.com/hackyourfuture-cph" name="GitHub" />
      </ul>
    </div>
  );
}

export function SocialMedia({ img, link, name }) {
  return (
    <li>
      <a className={styles.footer__link} href={link} target="_blank">
        <img src={img} alt={name} className={styles.footer__image} />
        {name}
      </a>
    </li>
  );
}
