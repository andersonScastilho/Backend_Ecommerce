"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _joiSchemaValidator = require('../middlewares/joiSchemaValidator'); var _joiSchemaValidator2 = _interopRequireDefault(_joiSchemaValidator);

var _RequestController = require('../controllers/RequestController'); var _RequestController2 = _interopRequireDefault(_RequestController);

var _createRequestSchema = require('../schemas/request/createRequestSchema'); var _createRequestSchema2 = _interopRequireDefault(_createRequestSchema);

const router = new (0, _express.Router)()

router.post('/', _loginRequired2.default, _joiSchemaValidator2.default.call(void 0, _createRequestSchema2.default), _RequestController2.default.store)
router.get('/', _loginRequired2.default, _RequestController2.default.index)

router.delete('/:request_id', _loginRequired2.default, _RequestController2.default.delete)

exports. default = router