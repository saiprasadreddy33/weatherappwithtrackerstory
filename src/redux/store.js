import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice.js';
import moodReducer from './slices/moodSlice';
import storyReducer from './slices/storySlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    mood: moodReducer,
    story: storyReducer,
  },
});

export default store;
