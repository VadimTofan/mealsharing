import styles from "./page.module.css";

export default function About() {
  return (
    <div className={`${styles.about} contentcard`}>
      <h2 className={styles.about__title}>About the Project</h2>
      <p className={styles.about__text}>
        This is a meal sharing app developed as part of my Hack Your Future project. The app allows users to discover and book home-cooked meals hosted by local cooks. It aims to connect people
        through authentic dining experiences, supporting community engagement and cultural exchange. Built with MySQL, Node.js, and Express, it showcases my skills in backend development, database
        design, and RESTful API implementation.
      </p>
    </div>
  );
}
