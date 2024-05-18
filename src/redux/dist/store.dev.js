"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _weatherSlice = _interopRequireDefault(require("./slices/weatherSlice.js"));

var _moodSlice = _interopRequireDefault(require("./slices/moodSlice"));

var _storySlice = _interopRequireDefault(require("./slices/storySlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _toolkit.configureStore)({
  reducer: {
    weather: _weatherSlice["default"],
    mood: _moodSlice["default"],
    story: _storySlice["default"]
  }
});
var _default = store;
exports["default"] = _default;
//# sourceMappingURL=store.dev.js.map
