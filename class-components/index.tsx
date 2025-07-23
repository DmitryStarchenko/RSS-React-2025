import { createRoot } from 'react-dom/client';
import { App } from './src/app/app.tsx';
import './styles.css';
import { CardContextProvider } from './src/shared';

createRoot(document.getElementById('root')).render(
  <CardContextProvider>
    <App />
  </CardContextProvider>,
);
