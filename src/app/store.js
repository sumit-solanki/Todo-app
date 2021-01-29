import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from '../features/todo/todoSlice';
export default configureStore({
  reducer: {
    todo : todoListReducer
  },
});
