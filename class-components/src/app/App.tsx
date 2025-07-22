import { ErrorBoundary, Page } from '../page';

export function App() {
  return (
    <>
      <ErrorBoundary>
        <Page />
      </ErrorBoundary>
    </>
  );
}
