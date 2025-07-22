import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './src/app/app.tsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
