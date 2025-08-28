import { Suspense } from 'react';
import { Main } from './components/main';
import { LoadingSpinner } from './components/loading-spinner';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Main />
    </Suspense>
  );
}

export default App;
