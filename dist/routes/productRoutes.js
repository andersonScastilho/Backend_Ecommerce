"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _loginAdmUserRequired = require('../middlewares/loginAdmUserRequired'); var _loginAdmUserRequired2 = _interopRequireDefault(_loginAdmUserRequired);
var _validUserRole = require('../middlewares/validUserRole'); var _validUserRole2 = _interopRequireDefault(_validUserRole);
var _joiSchemaValidator = require('../middlewares/joiSchemaValidator'); var _joiSchemaValidator2 = _interopRequireDefault(_joiSchemaValidator);

var _ProductController = require('../controllers/ProductController'); var _ProductController2 = _interopRequireDefault(_ProductController);

var _createProductSchema = require('../schemas/products/createProductSchema'); var _createProductSchema2 = _interopRequireDefault(_createProductSchema);
var _updateProductSchema = require('../schemas/products/updateProductSchema'); var _updateProductSchema2 = _interopRequireDefault(_updateProductSchema);

const router = new (0, _express.Router)();

router.post("/", _loginAdmUserRequired2.default, _validUserRole2.default, _joiSchemaValidator2.default.call(void 0, _createProductSchema2.default), _ProductController2.default.store);
router.get("/", _ProductController2.default.index);

router.put("/:product_id", _loginAdmUserRequired2.default, _validUserRole2.default, _joiSchemaValidator2.default.call(void 0, _updateProductSchema2.default), _ProductController2.default.update);
router.delete("/:product_id", _loginAdmUserRequired2.default, _validUserRole2.default, _ProductController2.default.delete);
router.get("/:product_id", _ProductController2.default.show);


exports. default = router;
