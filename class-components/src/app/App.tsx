import { Footer } from '../widgets';
import { ErrorBoundary, Main } from '../pages/main';

export function App() {
  return (
    <ErrorBoundary>
      <Main />
      <Footer />
    </ErrorBoundary>
  );
}
