import { Footer } from '../widgets';
import { ErrorBoundary, Main } from '../pages/main';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { About } from '../pages/about';
import { CardContext } from '../shared';
import { Card, FullList, Loader, NotFound } from '../pages/main/components';

function MainRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/main/page/*', { replace: true });
  }, [navigate]);
  return undefined;
}

export function App() {
  const { isLoading, error, card, list } = useContext(CardContext);
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainRedirect />} />
          <Route path="/main" element={<MainRedirect />} />
          <Route path="/main/*" element={<Main />}>
            {error ? (
              <Route path="not-found" element={<NotFound />} />
            ) : isLoading ? (
              <Route path="" element={<Loader />} />
            ) : card ? (
              <Route path="card/:card_id" element={<Card cards={card} />} />
            ) : (
              <Route path="page/:page_id" element={<FullList list={list} />} />
            )}
          </Route>
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </ErrorBoundary>
    </BrowserRouter>
  );
}
