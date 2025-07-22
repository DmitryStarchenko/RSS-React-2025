import { Component, ReactNode } from 'react';
import styles from './header.module.css';

type Props = {
  searchRequest: (searchString: string) => void;
};

export class Header extends Component<Props> {
  state = {
    search: '',
  };

  render(): ReactNode {
    const idItem = localStorage.getItem('key');
    return (
      <header className={styles.header}>
        <img
          className={styles.mainLogo}
          src="../../public/assets/Pikachu.webp"
          alt="pikachu"
        />
        <div className={styles.headerContent}>
          <input
            className={styles.input}
            type="search"
            placeholder={
              idItem ? `Opened card ${idItem}` : 'Enter ID (0-649) or name'
            }
            onChange={(event) => {
              this.setState({ search: event.target.value });
            }}
          />
          <button
            className={styles.buttonSearch}
            type="submit"
            onClick={() => {
              this.props.searchRequest(this.state.search);
            }}
          >
            Search
          </button>
        </div>
      </header>
    );
  }
}
