import { configureStore, Reducer } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import thunk from 'redux-thunk';
import { setupListeners } from '@reduxjs/toolkit/query';
import { RESET_STATE_ACTION_TYPE } from './actions/resetState';

import authReducer from '@/pages/auth/authSlice';
import jokeReducer from '@/pages/jokes/jokeSlice';
import { jokeApi } from '@/api/jokesApi';

const reducers = {
  // store state slices
  auth: authReducer,
  jokes: jokeReducer,

  // RTK Query api reducers
  [jokeApi.reducerPath]: jokeApi.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};
const persistedReducer: Reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([thunk, jokeApi.middleware]),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
