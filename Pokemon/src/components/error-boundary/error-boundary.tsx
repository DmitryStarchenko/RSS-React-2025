import { Component } from 'react';
import styles from '../styles/error-boundary.module.css';
import { Link } from 'react-router';
import Image from 'next/image';

interface MyComponentProps {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  info?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<MyComponentProps, State> {
  constructor(props: MyComponentProps) {
    super(props);
    this.state = { hasError: false, error: undefined, info: undefined };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error в ErrorBoundary:', error, errorInfo);
    this.setState({ error: error, info: errorInfo });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div className={styles.error}>
          <p className={styles.errorText}>Not Found</p>
          <Image
            className={styles.animation}
            src="../../../../assets/animation.gif"
            alt="animation"
          />
          <Link to="">
            <button
              className={styles.buttonRefresh}
              onClick={() => window.location.reload()}>
              Refresh
            </button>
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}
