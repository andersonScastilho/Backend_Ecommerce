"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _joiSchemaValidator = require('../middlewares/joiSchemaValidator'); var _joiSchemaValidator2 = _interopRequireDefault(_joiSchemaValidator);

var _TokenController = require('../controllers/TokenController'); var _TokenController2 = _interopRequireDefault(_TokenController);

var _tokenSchema = require('../schemas/tokens/tokenSchema'); var _tokenSchema2 = _interopRequireDefault(_tokenSchema);


const router = new (0, _express.Router)();

router.post("/", _joiSchemaValidator2.default.call(void 0, _tokenSchema2.default), _TokenController2.default.store);

exports. default = router;
