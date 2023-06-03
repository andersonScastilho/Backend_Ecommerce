"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _lib = require('joi/lib'); var _lib2 = _interopRequireDefault(_lib);

exports. default = _lib2.default.object({
    username: _lib2.default.string().min(5).max(15).required().regex(/^[^\d]+$/i),
    password: _lib2.default.string().min(6).max(50).required(/^[^\d]+$/gi)
})