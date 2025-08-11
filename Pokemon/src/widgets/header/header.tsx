import { useContext } from 'react';
import styles from './header.module.css';
import { NavLink } from 'react-router';
import { StyleContext } from '../../shared';
import { changeTheme } from '../../shared';

export function Header() {
  const { isDarkTheme, setIsDarkTheme } = useContext(StyleContext);

  return (
    <header className={styles.header}>
      <div className={styles.conteinerLogo}>
        <NavLink to="">
          <img
            className={styles.logo}
            src="../../assets/Pikachu.webp"
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
      <div
        className={styles.iconMode}
        onClick={() => {
          setIsDarkTheme(!isDarkTheme);
          changeTheme();
        }}></div>
    </header>
  );
}
