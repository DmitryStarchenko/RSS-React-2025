'use client';
import styles from './about.module.css';

export function About() {
  return (
    <main className={styles.aboutMain}>
      <div>
        <a className={styles.gh} href="https://github.com/DmitryStarchenko"></a>
        <a className={styles.rs} href="https://rs.school/courses/reactjs"></a>
      </div>
    </main>
  );
}
