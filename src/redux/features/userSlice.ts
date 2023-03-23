import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types/user.type';

const initialState: { value: UserType | null } = {
  value: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
