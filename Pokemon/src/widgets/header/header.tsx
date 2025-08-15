'use client';
import { useContext } from 'react';
import styles from './header.module.css';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import StyleContext from '../../shared/context/style-context/context';
import { pokemonApi } from '../../shared/store/services/api';
import { changeTheme } from '../../shared/change-theme';
import image from '../../../public/assets/dialogue-bubble.png';

export default function Header() {
  const { isDarkTheme, setIsDarkTheme } = useContext(StyleContext);
  const dispatch = useDispatch();

  const handleResetCache = (event: React.MouseEvent<HTMLElement>) => {
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
      <div className={styles.containerLogo}>
        <Link href="/main">
          <div className={styles.logo}></div>
        </Link>
        <Link href="/about">
          <img
            className={styles.dialogBubble}
            src={image.src}
            alt="dialogue-bubble"
          />
        </Link>
      </div>
      <div className={styles.iconMode} onClick={handleChangeTheme}></div>
    </header>
  );
}
