"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _joiSchemaValidator = require('../middlewares/joiSchemaValidator'); var _joiSchemaValidator2 = _interopRequireDefault(_joiSchemaValidator);

var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

var _createUserSchema = require('../schemas/users/createUserSchema'); var _createUserSchema2 = _interopRequireDefault(_createUserSchema);
var _updateUserSchema = require('../schemas/users/updateUserSchema'); var _updateUserSchema2 = _interopRequireDefault(_updateUserSchema);

const router = _express.Router.call(void 0, );

router.post("/", _joiSchemaValidator2.default.call(void 0, _createUserSchema2.default), _UserController2.default.store);
router.put("/", _joiSchemaValidator2.default.call(void 0, _updateUserSchema2.default), _loginRequired2.default, _UserController2.default.update);

router.get("/", _loginRequired2.default, _UserController2.default.show);
router.delete("/", _loginRequired2.default, _UserController2.default.delete);

exports. default = router;
