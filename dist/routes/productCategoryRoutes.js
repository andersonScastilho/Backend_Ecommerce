"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _loginAdmUserRequired = require('../middlewares/loginAdmUserRequired'); var _loginAdmUserRequired2 = _interopRequireDefault(_loginAdmUserRequired);
var _validUserRole = require('../middlewares/validUserRole'); var _validUserRole2 = _interopRequireDefault(_validUserRole);

var _ProductCategoryController = require('../controllers/ProductCategoryController'); var _ProductCategoryController2 = _interopRequireDefault(_ProductCategoryController);

const router = new (0, _express.Router)();

router.delete(
  "/:product_id/:category_id",
  _loginAdmUserRequired2.default,
  _validUserRole2.default,
  _ProductCategoryController2.default.delete
);

exports. default = router;
