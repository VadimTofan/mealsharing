import styles from './page.module.scss';

export function Error({ error }) {
  return (
    <div className={styles.error}>
      <p className={styles.error__text}>Error: {error}</p>
    </div>
  );
}
