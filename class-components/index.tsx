import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './src/app/App.tsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
