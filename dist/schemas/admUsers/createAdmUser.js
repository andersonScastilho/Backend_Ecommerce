"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);

exports. default = _joi2.default.object({
    fullname: _joi2.default.string().min(5).max(255).required().regex(/^[^\d]+$/i),
    email: _joi2.default.string().email().required(),
    username: _joi2.default.string().min(5).max(15).required().regex(/^[^\d]+$/i),
    role_id: _joi2.default.number().integer().required(),
    password: _joi2.default.string().min(6).max(50).required()
})