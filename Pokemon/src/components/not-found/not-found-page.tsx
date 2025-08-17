import styles from '../../components/styles/error-boundary.module.css';
import image from '../../../public/assets/animation.gif';
import { Link } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function NotFound() {
  const not = useTranslations('NotFound');
  return (
    <div className={styles.error}>
      <p className={styles.errorText}>{not('tittle')}</p>
      <Image
        className={styles.animation}
        src={image.src}
        width={600}
        height={350}
        alt="animation"
      />
      <Link href="/main">
        <button className={styles.buttonRefresh}>{not('button')}</button>
      </Link>
    </div>
  );
}
