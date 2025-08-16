'use client';
import { useRef, useState } from 'react';
import styles from '../styles/popup.module.css';

type Props = {
  url: string;
  selectedNumberPokemon: number;
};

export function FileDownloaderClient({ url, selectedNumberPokemon }: Props) {
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
      <button
        data-testid="buttonDownload"
        className={styles.download}
        onClick={handleDownload}>
        Download
      </button>
      <a
        data-testid="linkDownload"
        ref={downloadRef}
        href={downloadUrl}
        download={`${selectedNumberPokemon}-pokemons.csv`}
        style={{ display: 'none' }}>
        Download
      </a>
    </div>
  );
}
