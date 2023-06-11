import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuth {
  author: string;
  token: string;
}

export interface IUser {
  user: IAuth;
}

const initialState: IUser = {
  user: {
    author: '',
    token: '',
  },
};

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    logoutUser: (state) => (state = initialState),
    setAuth: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload.user;
    },
  },
});

export default authSlice.reducer;

export const { logoutUser, setAuth } = authSlice.actions;
