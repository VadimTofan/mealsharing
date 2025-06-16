import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
}

function Logo() {
  return (
    <div className={styles.header__logo}>
      <img src="/images/hyf.svg" alt="Logo" className={styles.header__logoImage} />
      <span className={styles.header__title}>Meal Sharing App - HYF</span>
    </div>
  );
}
