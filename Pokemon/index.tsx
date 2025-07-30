import { createRoot } from 'react-dom/client';
import { App } from './src/app';
import './styles.css';

export const root = document.getElementById('root');

createRoot(root).render(<App />);
