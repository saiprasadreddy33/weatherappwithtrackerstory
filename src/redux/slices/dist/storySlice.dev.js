"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.addStory = void 0;

var _toolkit = require("@reduxjs/toolkit");

var storySlice = (0, _toolkit.createSlice)({
  name: 'story',
  initialState: {
    stories: []
  },
  reducers: {
    addStory: function addStory(state, action) {
      state.stories.push(action.payload);
    }
  }
});
var addStory = storySlice.actions.addStory;
exports.addStory = addStory;
var _default = storySlice.reducer;
exports["default"] = _default;
//# sourceMappingURL=storySlice.dev.js.map
