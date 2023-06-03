"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _loginAdmUserRequired = require('../middlewares/loginAdmUserRequired'); var _loginAdmUserRequired2 = _interopRequireDefault(_loginAdmUserRequired);
var _validUserRole = require('../middlewares/validUserRole'); var _validUserRole2 = _interopRequireDefault(_validUserRole);

var _ImageController = require('../controllers/ImageController'); var _ImageController2 = _interopRequireDefault(_ImageController);

const updload = _multer2.default.call(void 0, { dest: "uploads" });

const router = new (0, _express.Router)();

router.post(
  "/:product_id",
  _loginAdmUserRequired2.default,
  _validUserRole2.default,
  updload.single("image"),
  _ImageController2.default.uploadFile
);
router.get("/:key", _ImageController2.default.getImagesByKey);
exports. default = router;
