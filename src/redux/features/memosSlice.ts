import { createSlice } from '@reduxjs/toolkit';
import { MemoModel } from '../../types/memo.type';

const initialState: { value: Array<MemoModel> } = {
  value: []
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
