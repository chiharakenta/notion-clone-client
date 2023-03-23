import { configureStore } from '@reduxjs/toolkit';
import { memosReducer } from './features/memosSlice';
import { userReducer } from './features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    memos: memosReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
