import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IJoke {
  id: number;
  body: string | null;
  title: string | null;
  views: string | null;
  author: string | null;
  createdat: number | number;
}

export interface IPage {
  page: number | null;
  limit: number | null;
  order: string;
  order_field: string;
}

interface IJokesState {
  jokes: IJoke[];
  page_meta: IPage;
}

const initialState: IJokesState = {
  jokes: [],
  page_meta: {
    page: 1,
    limit: 10,
    order: 'asc',
    order_field: 'createdAt',
  },
};

export const jokeSlice = createSlice({
  initialState,
  name: 'jokeSlice',
  reducers: {
    updateJokes: (
      state,
      action: PayloadAction<Omit<IJokesState, 'page_meta'>>
    ) => {
      state.jokes = action.payload.jokes;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.page_meta.page = action.payload;
    },
    updatePageLimit: (state, action: PayloadAction<number>) => {
      state.page_meta.limit = action.payload;
    },
    updateOrder: (
      state,
      action: PayloadAction<{ order: string; order_field: string }>
    ) => {
      state.page_meta.order = action.payload.order;
      state.page_meta.order_field = action.payload.order_field;
    },
  },
});

export default jokeSlice.reducer;

export const { updateJokes, updatePage, updatePageLimit, updateOrder } =
  jokeSlice.actions;
