"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);

exports. default = _joi2.default.object({
    email: _joi2.default.string().email().min(9).max(150).required(),
    password: _joi2.default.string().min(6).max(50).required()
})