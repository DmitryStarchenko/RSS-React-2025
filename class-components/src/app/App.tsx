import { Component } from 'react';
import { ErrorBoundary, Page } from '../page';

export class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <Page />
        </ErrorBoundary>
      </>
    );
  }
}
