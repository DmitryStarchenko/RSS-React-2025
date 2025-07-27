import { FullList, Main } from '../pages/main';
import { Route, Routes } from 'react-router';
import { About } from '../pages/about';

/*function MainRedirect(): undefined {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);
  return undefined;
}*/

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<FullList />} />
      </Route>
      <Route path="about" element={<About />} />
    </Routes>
  );
}
