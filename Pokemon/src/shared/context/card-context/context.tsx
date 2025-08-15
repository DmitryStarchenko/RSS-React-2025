'use client';
import { createContext, Dispatch, SetStateAction } from 'react';
import { ParamsQuery, Pokemon, Results } from '../../../types';

type Context = {
  list: Results[];
  setList: Dispatch<SetStateAction<Results[]>>;
  card: Pokemon | undefined;
  setCard: Dispatch<SetStateAction<Pokemon | undefined>>;
  paramsQuery: ParamsQuery;
  setParamsQuery: Dispatch<SetStateAction<ParamsQuery>>;
  cardView: boolean;
  setCardView: Dispatch<SetStateAction<boolean>>;
  isLoadingDetails: boolean;
  setIsLoadingDetails: Dispatch<SetStateAction<boolean>>;
};

const value = {
  list: [],
  setList: () => {},
  card: undefined,
  setCard: () => {},
  paramsQuery: {
    name: undefined,
    pageNumber: undefined,
  },
  setParamsQuery: () => {},
  cardView: false,
  setCardView: () => {},
  isLoadingDetails: false,
  setIsLoadingDetails: () => {},
};

const CardContext = createContext<Context>(value);
export default CardContext;
