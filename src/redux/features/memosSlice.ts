import { createSlice } from '@reduxjs/toolkit';
import { MemoType } from '../../types/memo.type';

const initialState: { value: Array<MemoType> | null } = {
  value: null
};

export const memosSlice = createSlice({
  name: 'memos',
  initialState,
  reducers: {
    setMemos: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setMemos } = memosSlice.actions;
export const memosReducer = memosSlice.reducer;
