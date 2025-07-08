import styles from "./footer.module.css";

import SocialMedias from "./SocialMedia";
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
        <a href="https://maps.app.goo.gl/aanF3tBXJzpfWBHE9" target="_blank">
          <img className={styles.footer__map} src="/images/googlemaps.png" alt="location on map" />
        </a>
      </div>
    </>
  );
};
