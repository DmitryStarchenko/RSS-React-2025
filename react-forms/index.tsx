import ReactDOM from 'react-dom/client';
import { App } from './src/App';
import './global.css';

const root = document.getElementById('root');
if (root instanceof HTMLElement) ReactDOM.createRoot(root).render(<App />);
