"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setWeather = void 0;

var _toolkit = require("@reduxjs/toolkit");

var weatherSlice = (0, _toolkit.createSlice)({
  name: 'weather',
  initialState: {
    weather: null
  },
  reducers: {
    setWeather: function setWeather(state, action) {
      state.weather = action.payload;
    }
  }
});
var setWeather = weatherSlice.actions.setWeather;
exports.setWeather = setWeather;
var _default = weatherSlice.reducer;
exports["default"] = _default;
//# sourceMappingURL=weatherSlice.dev.js.map
