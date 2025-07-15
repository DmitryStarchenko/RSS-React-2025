import { Component } from 'react';
import styles from './footer.module.css';

export class Footer extends Component {
  state = {
    isError: false,
  };

  render() {
    if (this.state.isError) {
      throw new Error('Произошла ошибка при нажатии на кнопку!');
    }
    return (
      <div className={styles.footer}>
        <button
          className={styles.errorButton}
          onClick={() => this.setState({ isError: true })}>
          Throw Error
        </button>
      </div>
    );
  }
}
