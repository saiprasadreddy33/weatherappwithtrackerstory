import { createSlice } from '@reduxjs/toolkit';

const storySlice = createSlice({
  name: 'story',
  initialState: {
    stories: [],
  },
  reducers: {
    addStory(state, action) {
      state.stories.push(action.payload);
    },
  },
});

export const { addStory } = storySlice.actions;
export default storySlice.reducer;
