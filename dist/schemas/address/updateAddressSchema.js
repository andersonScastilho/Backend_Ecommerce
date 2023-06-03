"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);

exports. default = _joi2.default.object({
    country: _joi2.default.string().min(4).max(20),
    state: _joi2.default.string().min(4).max(20),
    city: _joi2.default.string().min(4).max(20),
    neighborhood: _joi2.default.string().min(4).max(50),
    street: _joi2.default.string().min(4).max(100),
    complement: _joi2.default.string().min(4).max(20),
    address_number: _joi2.default.number().integer(),
    zip_code: _joi2.default.string().min(9).max(9)
})