import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import questionReducer from '../features/questions/questionSlice'
import scoreReducer from '../features/score/scoreSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    scores: scoreReducer,
  },
});
