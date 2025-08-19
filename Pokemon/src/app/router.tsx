import { Navigate, Route, Routes } from 'react-router';
import { FullList, Main, NotFound } from '../pages/main';
import { About } from '../pages/about';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="main" />} />
      <Route path="main" element={<Main />}>
        <Route index element={<FullList />} />
      </Route>
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
