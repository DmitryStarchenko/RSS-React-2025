import { Component } from 'react';
import styles from '../styles/error-boundary.module.css';

interface MyComponentProps {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  info?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<MyComponentProps, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Ошибка в ErrorBoundary:', error, errorInfo);
    this.setState({ error: error, info: errorInfo });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div className={styles.error}>
          <p className={styles.errorText}>Not Found</p>
          <img
            className={styles.animation}
            src="../../../../assets/animation.gif"
            alt="animation"
          />
          <button
            className={styles.buttonRefresh}
            onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
