import { useRef, useState } from 'react';
import { useAppSelector } from '../../../../shared';
import styles from '../styles/popup.module.css';

export function FileDownloader() {
  const [downloadUrl, setDownloadUrl] = useState('');
  const pokemons = useAppSelector((state) => state.pokemon.pokemon);
  const downloadRef = useRef(null);

  const handleDownload = () => {
    const fileContent = JSON.stringify(pokemons);
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
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
        download={`${pokemons.length}-pokemons.csv`}
        style={{ display: 'none' }}>
        Download
      </a>
    </div>
  );
}
