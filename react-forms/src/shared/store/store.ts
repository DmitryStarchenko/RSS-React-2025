import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '../../globalTypes';
import { useDispatch, useSelector } from 'react-redux';

interface SetImagePayload {
  data: string;
  name: string;
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    list: [
      'Belarus',
      'Russia',
      'Ukraine',
      'USA',
      'France',
      'United Kingdom',
      'China',
      'Japan',
      'Canada',
      'Australia',
      'Brazil',
    ],
  },
  reducers: {},
});

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    data: null,
    name: '',
  },
  reducers: {
    setImage: (state, action: PayloadAction<SetImagePayload>) => {
      state.data = action.payload.data;
      state.name = action.payload.name;
    },
    clearImage: (state) => {
      state.data = null;
      state.name = '';
    },
  },
});

export const { setImage, clearImage } = imageSlice.actions;

export const allInfoSlice = createSlice({
  name: 'Info',
  initialState: {
    age: null,
    confirmPassword: '',
    country: '',
    email: '',
    firstName: '',
    gender: '',
    password: '',
    terms: undefined,
  },
  reducers: {
    setInfo: (state, action: PayloadAction<Data>) => {
      state.firstName = action.payload.firstName;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
      state.gender = action.payload.gender;
      state.country = action.payload.country;
      state.terms = action.payload.terms;
    },
  },
});

export const { setInfo } = allInfoSlice.actions;

export const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
    image: imageSlice.reducer,
    allInfo: allInfoSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
