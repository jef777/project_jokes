import { authSlice, logoutUser, setAuth } from '../auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: {
      author: '',
      token: '',
    },
  };

  it('should handle logoutUser', () => {
    const newState = authSlice.reducer(initialState, logoutUser());
    expect(newState).toEqual(initialState);
  });

  it('should handle setAuth', () => {
    const user = {
      author: 'John Doe',
      token: 'abc123',
    };
    const newState = authSlice.reducer(initialState, setAuth({ user }));
    expect(newState).toEqual({ user });
  });
});
