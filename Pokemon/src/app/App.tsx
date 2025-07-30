import { Footer, Header } from '../widgets';
import { ErrorBoundary } from '../pages/main';
import { BrowserRouter } from 'react-router';
import { CardContextProvider } from '../shared';
import { Router } from '.';
import { Provider } from 'react-redux';
import { store } from '../shared/store';

export function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <CardContextProvider>
            <Header />
            <Router />
            <Footer />
          </CardContextProvider>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
