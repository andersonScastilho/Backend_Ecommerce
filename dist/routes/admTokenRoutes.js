"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _joiSchemaValidator = require('../middlewares/joiSchemaValidator'); var _joiSchemaValidator2 = _interopRequireDefault(_joiSchemaValidator);

var _AdmTokenController = require('../controllers/AdmTokenController'); var _AdmTokenController2 = _interopRequireDefault(_AdmTokenController);

var _admTokenSchema = require('../schemas/tokens/admTokenSchema'); var _admTokenSchema2 = _interopRequireDefault(_admTokenSchema);

const router = new (0, _express.Router)();

router.post("/", _joiSchemaValidator2.default.call(void 0, _admTokenSchema2.default), _AdmTokenController2.default.store);


exports. default = router;
