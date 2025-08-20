import { Modal } from './components/modal/Modal';
import styles from './app.module.css';
import { useModal } from './shared/hooks/useModal';
import { store } from './shared/store/store';
import { Provider } from 'react-redux';
import { ResultView } from './components/result-view/result-view';

export function App() {
  const { isShowing, toggle } = useModal();

  return (
    <Provider store={store}>
      <main className={styles.main}>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Show uncontrolled form</button>
          <button className={styles.button} onClick={toggle}>
            Show controlled form
          </button>
        </div>
        <ResultView isShowing={isShowing} />
        <Modal isShowing={isShowing} hide={toggle} />
      </main>
    </Provider>
  );
}
