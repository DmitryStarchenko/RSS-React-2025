import { Main } from '../pages/main';
import { Route, Routes } from 'react-router';
import { About } from '../pages/about';

export function Router() {
  return (
    <Routes>
      <Route path="/*" element={<Main />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
}
