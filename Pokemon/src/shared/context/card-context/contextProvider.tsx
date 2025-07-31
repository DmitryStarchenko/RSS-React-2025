import { useState } from 'react';
import { Pokemon, Results } from '../../../types';
import { CardContext } from '.';

type ProviderProps = { children: React.ReactNode };

export function CardContextProvider({ children }: ProviderProps) {
  const [list, setList] = useState<Results[]>([]);
  const [card, setCard] = useState<Pokemon>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSearchParam, setCurrentSearchParam] = useState();
  const [cardView, setCardView] = useState(false);

  const value = {
    list,
    setList,
    card,
    setCard,
    error,
    setError,
    isLoading,
    setIsLoading,
    currentSearchParam,
    setCurrentSearchParam,
    cardView,
    setCardView,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
