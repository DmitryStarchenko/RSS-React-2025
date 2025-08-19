import { useState } from 'react';
import { ParamsQuery, Pokemon, Results } from '../../../types';
import { CardContext } from '.';
import { useLocalStorage } from '../../../shared/custom-hooks';

type ProviderProps = { children: React.ReactNode };

export function CardContextProvider({ children }: ProviderProps) {
  const KEY = 'SavePokemon';
  const [valueLS] = useLocalStorage('', KEY);
  const params = {
    name: typeof valueLS === 'string' ? valueLS : undefined,
    pageNumber: undefined,
  };
  const [list, setList] = useState<Results[]>([]);
  const [card, setCard] = useState<Pokemon>();
  const [paramsQuery, setParamsQuery] = useState<ParamsQuery>(params);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [currentSearchParam, setCurrentSearchParam] = useState();
  const [cardView, setCardView] = useState(false);

  const value = {
    list,
    setList,
    card,
    setCard,
    paramsQuery,
    setParamsQuery,
    currentSearchParam,
    setCurrentSearchParam,
    cardView,
    setCardView,
    isLoadingDetails,
    setIsLoadingDetails,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
