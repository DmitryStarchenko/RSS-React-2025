import { Card, Main } from '../pages/main';
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
      <Route path="/*" element={<Main />}>
        <Route path="search/*">
          <Route path=":id" element={<Card />} />
        </Route>
      </Route>
      <Route path="about" element={<About />} />
    </Routes>
  );
}
