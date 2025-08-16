'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import styles from '../styles/language-switcher.module.css';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (newLocale: string) => {
    if (!pathname) {
      router.push(`/${newLocale}`);
      return;
    }

    const pathWithoutLocale = pathname.startsWith(`/${currentLocale}`)
      ? pathname.replace(`/${currentLocale}`, '')
      : pathname;
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className={styles.contain}>
      <button
        onClick={() => switchLocale('en')}
        disabled={currentLocale === 'en'}
        className={styles.en}>
        EN
      </button>
      <button
        onClick={() => switchLocale('ru')}
        disabled={currentLocale === 'ru'}
        className={styles.ru}>
        RU
      </button>
    </div>
  );
}
