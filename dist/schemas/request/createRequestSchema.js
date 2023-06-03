"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);

exports. default = _joi2.default.object({
    address_id: _joi2.default.number().integer().required(),
    products: _joi2.default.array().items(_joi2.default.object({
        product_id: _joi2.default.number().integer().required(),
        quantity: _joi2.default.number().integer().required()
    })).required()

})