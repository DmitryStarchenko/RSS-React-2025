'use client';
import styles from './header.module.css';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { pokemonApi } from '../../shared/store/services/api';
import image from '../../../public/assets/dialogue-bubble.png';
import { useTheme } from '../../shared/custom-hooks/useTheme';

export default function Header() {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const handleResetCache = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(pokemonApi.util.resetApiState());
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
      <div className={styles.selectContainer}>
        <select className={styles.select}>
          <option className={styles.options} value="en" selected>
            Английский
          </option>
          <option className={styles.options} value="ru">
            Русский
          </option>
        </select>
      </div>
      <div
        onClick={toggleTheme}
        className={styles.iconMode}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}></div>
    </header>
  );
}
