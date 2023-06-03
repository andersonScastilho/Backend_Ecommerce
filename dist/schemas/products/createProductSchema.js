"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);

exports. default = _joi2.default.object({
    description: _joi2.default.string().min(3).max(50).required(),
    price: _joi2.default.number().required(),
    packaging: _joi2.default.string().min(2).max(10).required().regex(/^[^\d]+$/i),
    image_key: _joi2.default.string(),
    category_id: _joi2.default.number().integer().required(),
    name: _joi2.default.string().min(3).max(50).required().regex(/^[^\d]+$/i)
})