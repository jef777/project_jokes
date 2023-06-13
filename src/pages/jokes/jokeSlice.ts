import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IJoke {
  Id: string;
  Body: string;
  Title: string;
  Views?: string;
  Author?: string;
  CreatedAt?: string;
}

export type FilterData = {
  [key: string]: {
    filter_field: string;
    filter: string;
  };
};

export interface IPage {
  page: number | null;
  limit: number | null;
  order: string;
  order_field: string;
  filter: FilterData;
}

interface IJokesState {
  jokes: IJoke[];
  page_meta: IPage;
}

const initialState: IJokesState = {
  jokes: [],
  page_meta: {
    page: 1,
    limit: 5,
    order: 'asc',
    order_field: 'CreatedAt',
    filter: {},
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
      state.page_meta.page = 1;
    },
    updateOrder: (
      state,
      action: PayloadAction<{ order: string; order_field: string }>
    ) => {
      state.page_meta.order = action.payload.order;
      state.page_meta.order_field = action.payload.order_field;
    },

    updateFilter: (state, action: PayloadAction<FilterData>) => {
      state.page_meta.filter = action.payload;
    },
    clearFilter: (state) => {
      state.page_meta.filter = {};
    },
  },
});

export default jokeSlice.reducer;

export const {
  updateJokes,
  updatePage,
  updatePageLimit,
  updateOrder,
  updateFilter,
  clearFilter,
} = jokeSlice.actions;
