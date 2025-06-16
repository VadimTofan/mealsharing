import styles from "./footer.module.css";

export default function Footer() {
  return (
    <>
      <FooterElement />
    </>
  );
}

export const FooterElement = () => {
  return (
    <>
      <div className={styles.footer}>
        <SocialMedias />
        <Map />
      </div>
    </>
  );
};

function Map() {
  return (
    <a href="https://maps.app.goo.gl/aanF3tBXJzpfWBHE9" target="_blank">
      <img className={styles.footer__map} src="/images/googlemaps.png" alt="location on map" />
    </a>
  );
}

function SocialMedias() {
  return (
    <div className={styles.footer__socials}>
      <h3 className={styles.footer__heading}>Follow us on Social Media</h3>
      <ul className={styles.footer__links}>
        <SocialMedia img="/images/linkedin.png" link="https://www.linkedin.com/school/hackyourfuture-denmark/" name="LinkedIn" />
        <SocialMedia img="/images/instagram.png" link="https://www.instagram.com/hackyourfuture.dkm" name="Instagram" />
        <SocialMedia img="/images/facebook.png" link="https://www.facebook.com/hackyourfuturedenmark" name="Facebook" />
        <SocialMedia img="/images/youtube.png" link="https://www.youtube.com/@hackyourfuturedenmark8032" name="YouTube" />
        <SocialMedia img="/images/github.png" link="https://github.com/hackyourfuture-cph" name="GitHub" />
      </ul>
    </div>
  );
}

function SocialMedia({ img, link, name }) {
  return (
    <li>
      <a className={styles.footer__link} href={link} target="_blank">
        <img src={img} alt={name} style={{ width: "20px", marginRight: "8px", verticalAlign: "middle" }} />
        {name}
      </a>
    </li>
  );
}
