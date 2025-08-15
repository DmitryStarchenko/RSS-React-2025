'use client';
import { createContext, Dispatch, SetStateAction } from 'react';
import {
  CurrentSearchParams,
  ParamsQuery,
  Pokemon,
  Results,
} from '../../../types';

type Context = {
  list: Results[];
  setList: Dispatch<SetStateAction<Results[]>>;
  card: Pokemon | undefined;
  setCard: Dispatch<SetStateAction<Pokemon | undefined>>;
  paramsQuery: ParamsQuery;
  setParamsQuery: Dispatch<SetStateAction<ParamsQuery>>;
  currentSearchParam: CurrentSearchParams;
  setCurrentSearchParam: Dispatch<SetStateAction<CurrentSearchParams>>;
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
  currentSearchParam: { page: '' },
  setCurrentSearchParam: () => {},
  cardView: false,
  setCardView: () => {},
  isLoadingDetails: false,
  setIsLoadingDetails: () => {},
};

const CardContext = createContext<Context>(value);
export default CardContext;
