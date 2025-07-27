import { Footer, Header } from '../widgets';
import { ErrorBoundary } from '../pages/main';
import { BrowserRouter } from 'react-router';
import { CardContextProvider } from '../shared';
import { Router } from '.';

export function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <CardContextProvider>
          <Header />
          <Router />
          <Footer />
        </CardContextProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
