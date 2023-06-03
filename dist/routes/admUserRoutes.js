"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _loginAdmUserRequired = require('../middlewares/loginAdmUserRequired'); var _loginAdmUserRequired2 = _interopRequireDefault(_loginAdmUserRequired);
var _joiSchemaValidator = require('../middlewares/joiSchemaValidator'); var _joiSchemaValidator2 = _interopRequireDefault(_joiSchemaValidator);

var _AdmUserController = require('../controllers/AdmUserController'); var _AdmUserController2 = _interopRequireDefault(_AdmUserController);

var _createAdmUser = require('../schemas/admUsers/createAdmUser'); var _createAdmUser2 = _interopRequireDefault(_createAdmUser);

const router = new (0, _express.Router)();

router.post("/", _loginAdmUserRequired2.default, _joiSchemaValidator2.default.call(void 0, _createAdmUser2.default), _AdmUserController2.default.store);
router.get("/", _loginAdmUserRequired2.default, _AdmUserController2.default.show);

exports. default = router;
