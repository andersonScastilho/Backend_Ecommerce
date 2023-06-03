"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);


exports. default = _joi2.default.object({
    name: _joi2.default.string().min(3).max(20).required().regex(/^[^\d]+$/i),
    surname: _joi2.default.string().min(3).max(50).required().regex(/^[^\d]+$/i),
    tel: _joi2.default.string().required(),
    email: _joi2.default.string().min(9).max(150).email().required(),
    password: _joi2.default.string().min(6).max(50).required()
})
