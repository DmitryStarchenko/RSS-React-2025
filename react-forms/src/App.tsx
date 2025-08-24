import { Modal } from './components/modal/Modal';
import styles from './app.module.css';
import { useModal } from './shared/hooks/useModal';
import { store } from './shared/store/store';
import { Provider } from 'react-redux';
import { ResultView } from './components/result-view/result-view';
import { useEffect, useState } from 'react';

export function App() {
  const { isShowing, toggle } = useModal();
  const [isControlled, setIsControlled] = useState(false);

  const handleClick = () => {
    toggle();
    setIsControlled(true);
  };

  useEffect(() => {
    if (!isShowing) setIsControlled(false);
  }, [isShowing]);

  return (
    <Provider store={store}>
      <main className={styles.main}>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={toggle}>
            Show uncontrolled form
          </button>
          <button className={styles.button} onClick={handleClick}>
            Show controlled form
          </button>
        </div>
        <ResultView isShowing={isShowing} />
        <Modal
          isShowing={isShowing}
          hide={toggle}
          isControlled={isControlled}
        />
      </main>
    </Provider>
  );
}
