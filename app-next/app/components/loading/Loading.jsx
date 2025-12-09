import styles from './page.module.scss';

export function Loading({ loading = 'Loading...' }) {
  const letters = loading.split('');
  return (
    <div className={styles.loading}>
      <p className={styles.loading__text}>
        {letters?.map((letter, index) => (
          <span
            key={index}
            className={styles.loading__letter}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
}
