import { useContext } from 'react';
import styles from './header.module.css';
import { NavLink } from 'react-router';
import { pokemonApi, StyleContext } from '../../shared';
import { changeTheme } from '../../shared';
import { useDispatch } from 'react-redux';

export function Header() {
  const { isDarkTheme, setIsDarkTheme } = useContext(StyleContext);
  const dispatch = useDispatch();

  const handleResetCache = (event) => {
    event.preventDefault();
    dispatch(pokemonApi.util.resetApiState());
  };

  const handleChangeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    changeTheme();
  };

  return (
    <header className={styles.header}>
      <button className={styles.resetCache} onClick={handleResetCache}>
        Reset Cache
      </button>
      <div className={styles.conteinerLogo}>
        <NavLink to="">
          <div className={styles.logo}></div>
        </NavLink>
        <NavLink to="/about">
          <img
            className={styles.dialogBuble}
            src="../../../assets/dialogue-bubble.png"
            alt="dialogue-bubble"
          />
        </NavLink>
      </div>
      <div className={styles.iconMode} onClick={handleChangeTheme}></div>
    </header>
  );
}
