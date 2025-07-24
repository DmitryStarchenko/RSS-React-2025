import styles from './header.module.css';
import { NavLink } from 'react-router';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.conteinerLogo}>
        <NavLink to="/main">
          <img
            className={styles.logo}
            src="../../public/assets/Pikachu.webp"
            alt="pikachu"
          />
        </NavLink>
        <NavLink to="/about">
          <img
            className={styles.dialogBuble}
            src="../../../assets/dialogue-bubble.png"
            alt="dialogue-bubble"
          />
        </NavLink>
      </div>
    </header>
  );
}
