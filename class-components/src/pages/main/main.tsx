import { useContext, useEffect } from 'react';
import { Pokemon } from '../../types';
import { Header } from './header';
import { Pagination } from './components';
import { apiRequest, CardContext, useLocalStorage } from '../../shared';
import { Outlet } from 'react-router';

export function Main() {
  const [value] = useLocalStorage('');
  const { setList, setCard, setIsLoading } = useContext(CardContext);

  useEffect((): void => {
    apiRequest(typeof value === 'string' ? value : '')
      .then((response) => response.json())
      .then((response: Pokemon) => {
        if (value && response) {
          setCard(response);
          setIsLoading(false);
        } else {
          setList(response.results);
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <>
      <Header />
      <Pagination />
      <Outlet />
    </>
  );
}
