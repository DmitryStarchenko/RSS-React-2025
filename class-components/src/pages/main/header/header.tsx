import styles from './header.module.css';
import { handlerSearchRequest, useLocalStorage } from '../../../shared';
import { NavLink, useNavigate } from 'react-router';
import { useContext } from 'react';
import { CardContext } from '../../../shared';

export function Header() {
  const [value, setValue] = useLocalStorage('');
  const { setList, setCard, setError } = useContext(CardContext);
  const navigate = useNavigate();
  const props = {
    setList,
    setCard,
    setError,
  };

  return (
    <header className={styles.header}>
      <div className={styles.conteinerLogo}>
        <img
          className={styles.logo}
          src="../../public/assets/Pikachu.webp"
          alt="pikachu"
        />
        <NavLink to="/about">
          <img
            className={styles.dialogBuble}
            src="../../../assets/dialogue-bubble.png"
            alt="dialogue-bubble"
          />
        </NavLink>
      </div>
      <div className={styles.headerContent}>
        <input
          className={styles.input}
          type="search"
          placeholder={'Enter ID (0-649) or name'}
          onChange={(event) => {
            if (typeof setValue !== 'string') setValue(event.target.value);
          }}
          value={typeof value === 'string' ? value : ''}
        />
        <button
          className={styles.buttonSearch}
          type="submit"
          onClick={() => {
            handlerSearchRequest(
              typeof value === 'string' ? value : '',
              0,
              props,
            );
            if (value === '') {
              navigate(`/main`);
            } else {
              navigate(`/main/card/${value}`);
            }
          }}>
          Search
        </button>
      </div>
    </header>
  );
}
