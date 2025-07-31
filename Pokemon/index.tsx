import ReactDOM from 'react-dom/client';
import { App } from './src/app';
import './styles.css';

export const root = document.getElementById('root');
if (root instanceof HTMLElement) ReactDOM.createRoot(root).render(<App />);
