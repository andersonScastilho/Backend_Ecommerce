"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _loginAdmUserRequired = require('../middlewares/loginAdmUserRequired'); var _loginAdmUserRequired2 = _interopRequireDefault(_loginAdmUserRequired);
var _validUserRole = require('../middlewares/validUserRole'); var _validUserRole2 = _interopRequireDefault(_validUserRole);
var _joiSchemaValidator = require('../middlewares/joiSchemaValidator'); var _joiSchemaValidator2 = _interopRequireDefault(_joiSchemaValidator);

var _CategoryController = require('../controllers/CategoryController'); var _CategoryController2 = _interopRequireDefault(_CategoryController);

var _categorySchema = require('../schemas/category/categorySchema'); var _categorySchema2 = _interopRequireDefault(_categorySchema);

const router = new (0, _express.Router)();

router.post("/", _loginAdmUserRequired2.default, _validUserRole2.default, _joiSchemaValidator2.default.call(void 0, _categorySchema2.default), _CategoryController2.default.store);

router.delete("/:category_id", _loginAdmUserRequired2.default, _validUserRole2.default, _CategoryController2.default.delete);

exports. default = router;
