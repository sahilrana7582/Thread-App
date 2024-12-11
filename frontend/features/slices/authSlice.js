import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginReducer } = authSlice.actions;

export default authSlice.reducer;
