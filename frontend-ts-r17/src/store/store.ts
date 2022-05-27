import { configureStore } from '@reduxjs/toolkit';
// slice imports go here
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    // slice reducers go here
    user: userReducer,
  },
});

export default store;
