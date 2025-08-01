// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './jobSlice';

const store = configureStore({
  reducer: {
    job: jobReducer, // <--- this key must match what you use in useSelector
  },
});

export default store;
