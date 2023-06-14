import jokeReducer, {
  updateJokes,
  updatePage,
  updatePageLimit,
  updateOrder,
  updateFilter,
  clearFilter,
  IJoke,
  FilterData,
} from '../jokes/jokeSlice';

describe('jokeSlice', () => {
  describe('reducer', () => {
    it('should handle updateJokes', () => {
      const initialState = {
        jokes: [] as IJoke[],
        page_meta: {
          page: 1,
          limit: 5,
          order: 'asc',
          order_field: 'CreatedAt',
          filter: {} as FilterData,
        },
      };
      const jokes: IJoke[] = [
        {
          Id: '1',
          Body: 'Joke 1',
          Title: 'Title 1',
          Views: '10',
          Author: 'Author 1',
          CreatedAt: '2022-01-01',
        },
        {
          Id: '2',
          Body: 'Joke 2',
          Title: 'Title 2',
          Views: '5',
          Author: 'Author 2',
          CreatedAt: '2022-01-02',
        },
      ];
      const nextState = jokeReducer(initialState, updateJokes({ jokes }));

      expect(nextState.jokes).toEqual(jokes);
    });

    it('should handle updatePage', () => {
      const initialState = {
        jokes: [] as IJoke[],
        page_meta: {
          page: 1,
          limit: 5,
          order: 'asc',
          order_field: 'CreatedAt',
          filter: {} as FilterData,
        },
      };
      const page = 2;
      const nextState = jokeReducer(initialState, updatePage(page));

      expect(nextState.page_meta.page).toEqual(page);
    });

    it('should handle updatePageLimit', () => {
      const initialState = {
        jokes: [] as IJoke[],
        page_meta: {
          page: 1,
          limit: 5,
          order: 'asc',
          order_field: 'CreatedAt',
          filter: {} as FilterData,
        },
      };
      const limit = 10;
      const nextState = jokeReducer(initialState, updatePageLimit(limit));

      expect(nextState.page_meta.limit).toEqual(limit);
      expect(nextState.page_meta.page).toEqual(1);
    });

    it('should handle updateOrder', () => {
      const initialState = {
        jokes: [] as IJoke[],
        page_meta: {
          page: 1,
          limit: 5,
          order: 'asc',
          order_field: 'CreatedAt',
          filter: {} as FilterData,
        },
      };
      const order = 'desc';
      const order_field = 'Views';
      const nextState = jokeReducer(
        initialState,
        updateOrder({ order, order_field })
      );

      expect(nextState.page_meta.order).toEqual(order);
      expect(nextState.page_meta.order_field).toEqual(order_field);
    });

    it('should handle updateFilter', () => {
      const initialState = {
        jokes: [] as IJoke[],
        page_meta: {
          page: 1,
          limit: 5,
          order: 'asc',
          order_field: 'CreatedAt',
          filter: {} as FilterData,
        },
      };
      const filter: FilterData = {
        category: { filter_field: 'Category', filter: 'Comedy' },
      };
      const nextState = jokeReducer(initialState, updateFilter(filter));

      expect(nextState.page_meta.filter).toEqual(filter);
    });

    it('should handle clearFilter', () => {
      const initialState = {
        jokes: [] as IJoke[],
        page_meta: {
          page: 1,
          limit: 5,
          order: 'asc',
          order_field: 'CreatedAt',
          filter: {
            category: { filter_field: 'Category', filter: 'Comedy' },
          },
        },
      };
      const nextState = jokeReducer(initialState, clearFilter());

      expect(nextState.page_meta.filter).toEqual({});
    });
  });
});
