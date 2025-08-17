'use client';
import styles from './header.module.css';
import { useDispatch } from 'react-redux';
import { pokemonApi } from '../../shared/store/services/api';
import image from '../../../public/assets/dialogue-bubble.png';
import imageRu from '../../../public/assets/dialogue-bubble-ru.png';
import { useTheme } from '../../shared/custom-hooks/useTheme';
import LanguageSwitcher from '../../components/language-switcher/language-switcher';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '../../i18n/navigation';
import Image from 'next/image';

export default function Header() {
  const header = useTranslations('Header');
  const pathName = usePathname();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const handleResetCache = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(pokemonApi.util.resetApiState());
  };

  return (
    <header className={styles.header}>
      <button className={styles.resetCache} onClick={handleResetCache}>
        {header('reset')}
      </button>
      <div className={styles.containerLogo}>
        <Link href="/main">
          <div className={styles.logo}></div>
        </Link>
        <Link href="/about">
          <Image
            className={styles.dialogBubble}
            src={pathName.startsWith('/en') ? image.src : imageRu.src}
            width={170}
            height={120}
            alt="dialogue-bubble"
          />
        </Link>
      </div>
      <LanguageSwitcher />
      <div
        onClick={toggleTheme}
        className={styles.iconMode}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}></div>
    </header>
  );
}
