"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);

exports. default = _joi2.default.object({
    country: _joi2.default.string().min(4).max(20).required().regex(/^[^\d]+$/i),
    state: _joi2.default.string().min(4).max(20).required().regex(/^[^\d]+$/i),
    city: _joi2.default.string().min(4).max(20).required().regex(/^[^\d]+$/i),
    neighborhood: _joi2.default.string().min(4).max(50).required().regex(/^[^\d]+$/i),
    street: _joi2.default.string().min(4).max(100).required().regex(/^[^\d]+$/i),
    complement: _joi2.default.string().min(4).max(20).regex(/^[^\d]+$/i),
    address_number: _joi2.default.number().integer().required(),
    zip_code: _joi2.default.string().min(9).max(9).required().regex(/^[0-9]{5}-[0-9]{3}$/)
})