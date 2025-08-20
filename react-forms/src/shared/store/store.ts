import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface SetImagePayload {
  data: string;
  name: string;
}

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

export const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
    image: imageSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
