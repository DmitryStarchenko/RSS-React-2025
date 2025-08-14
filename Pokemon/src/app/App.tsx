import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { Footer, Header } from '../widgets';
import { ErrorBoundary } from '../pages/main';
import { CardContextProvider, StyleContextProvider, store } from '../shared';
import { Router } from '.';

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
