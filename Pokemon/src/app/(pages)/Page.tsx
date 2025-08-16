'use client';

import { Provider } from 'react-redux';
import store from '../../shared/store/configureStore';
import { StyleContextProvider } from '../../shared/context/style-context/contextProvider';
import CardContextProvider from '../../shared/context/card-context/contextProvider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StyleContextProvider>
        <CardContextProvider>{children}</CardContextProvider>
      </StyleContextProvider>
    </Provider>
  );
}
