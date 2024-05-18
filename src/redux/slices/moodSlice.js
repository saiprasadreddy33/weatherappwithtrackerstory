import { createSlice } from '@reduxjs/toolkit';

const moodSlice = createSlice({
  name: 'mood',
  initialState: {
    moods: [],
  },
  reducers: {
    addMood(state, action) {
      state.moods.push(action.payload);
    },
  },
});

export const { addMood } = moodSlice.actions;
export default moodSlice.reducer;
