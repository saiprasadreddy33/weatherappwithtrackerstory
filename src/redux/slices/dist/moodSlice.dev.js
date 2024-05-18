"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.addMood = void 0;

var _toolkit = require("@reduxjs/toolkit");

var moodSlice = (0, _toolkit.createSlice)({
  name: 'mood',
  initialState: {
    moods: []
  },
  reducers: {
    addMood: function addMood(state, action) {
      state.moods.push(action.payload);
    }
  }
});
var addMood = moodSlice.actions.addMood;
exports.addMood = addMood;
var _default = moodSlice.reducer;
exports["default"] = _default;
//# sourceMappingURL=moodSlice.dev.js.map
