import styles from './about.module.css';

export function About() {
  return (
    <main className={styles.aboutMain}>
      <div className={styles.content}>
        <div className={styles.ghConteiner}>
          <a
            className={styles.gh}
            href="https://github.com/DmitryStarchenko"></a>
        </div>
        <div className={styles.rsConteiner}>
          <a className={styles.rs} href="https://rs.school/courses/reactjs"></a>
        </div>
      </div>
    </main>
  );
}
