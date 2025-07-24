import { apiRequest } from '../api';
import { Pokemon, Results } from '../../types';

type Props = {
  setList: React.Dispatch<React.SetStateAction<Results[]>>;
  setCard: React.Dispatch<React.SetStateAction<Pokemon>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

export function handleSearchRequest(
  searchString: string = '',
  pageNumber: number = 1,
  props: Props,
) {
  const { setList, setCard, setError } = props;
  apiRequest(searchString, pageNumber)
    .then((response) => {
      if (
        Math.trunc(response.status / 100) === 4 ||
        Math.trunc(response.status / 100) === 5
      ) {
        setError(true);
      } else {
        setError(false);
        return response.json();
      }
    })
    .then((response: Pokemon) => {
      if (searchString.length) {
        setCard(response);
      } else {
        setCard(undefined);
        setList(response.results);
      }
    });
}
