import { Footer, Header } from '../widgets';
import { ErrorBoundary } from '../pages/main';
import { BrowserRouter } from 'react-router';
import { CardContextProvider, StyleContextProvider } from '../shared';
import { Router } from '.';
import { Provider } from 'react-redux';
import { store } from '../shared/store';

export function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <StyleContextProvider>
            <CardContextProvider>
              <Header />
              <Router />
              <Footer />
            </CardContextProvider>
          </StyleContextProvider>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
