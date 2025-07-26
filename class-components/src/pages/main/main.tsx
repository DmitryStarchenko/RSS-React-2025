import { useContext, useEffect } from 'react';
import { Pokemon } from '../../types';
import { FullList, Loader, NotFound, Search } from './components';
import { apiRequest, CardContext, useLocalStorage } from '../../shared';
import { Outlet, useNavigate } from 'react-router';

export function Main() {
  const KEY = 'SavePokemon';
  const [value] = useLocalStorage('', KEY);
  const { setList, setCard, setIsLoading, isLoading, error } =
    useContext(CardContext);
  const navigate = useNavigate();

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
    if (value !== '') {
      navigate('');
      navigate(`search/${value}`, { replace: true });
    }
  }, []);

  return (
    <>
      <Search />
      {error ? (
        <NotFound />
      ) : isLoading ? (
        <Loader />
      ) : value === '' ? (
        <FullList />
      ) : (
        <Outlet />
      )}
    </>
  );
}
