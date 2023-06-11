import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

const baseUrl = `${import.meta.env.VITE_APP_BASE_API_URL}/zu9TVE/`;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it

  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  return result;
};

export default customFetchBase;
