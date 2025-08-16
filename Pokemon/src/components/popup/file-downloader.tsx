'use client';
import { useRef, useState } from 'react';
import styles from '../styles/popup.module.css';
import { useTranslations } from 'next-intl';

type Props = {
  url: string;
  selectedNumberPokemon: number;
};

export function FileDownloaderClient({ url, selectedNumberPokemon }: Props) {
  const popup = useTranslations('Popup');
  const [downloadUrl, setDownloadUrl] = useState('');
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    setDownloadUrl(url);
    setTimeout(() => {
      if (downloadRef.current) {
        downloadRef.current.click();
        URL.revokeObjectURL(url);
        setDownloadUrl('');
      }
    }, 0);
  };

  return (
    <div>
      <button className={styles.download} onClick={handleDownload}>
        {popup('download')}
      </button>
      <a
        ref={downloadRef}
        href={downloadUrl}
        download={`${selectedNumberPokemon}-pokemons.csv`}
        style={{ display: 'none' }}></a>
    </div>
  );
}
