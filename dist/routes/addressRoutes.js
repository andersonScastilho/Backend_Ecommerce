"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _joiSchemaValidator = require('../middlewares/joiSchemaValidator'); var _joiSchemaValidator2 = _interopRequireDefault(_joiSchemaValidator);

var _AddressController = require('../controllers/AddressController'); var _AddressController2 = _interopRequireDefault(_AddressController);

var _createAddressSchema = require('../schemas/address/createAddressSchema'); var _createAddressSchema2 = _interopRequireDefault(_createAddressSchema);
var _updateAddressSchema = require('../schemas/address/updateAddressSchema'); var _updateAddressSchema2 = _interopRequireDefault(_updateAddressSchema);

const router = new (0, _express.Router)();

router.get("/", _loginRequired2.default, _AddressController2.default.index);
router.post("/", _loginRequired2.default, _joiSchemaValidator2.default.call(void 0, _createAddressSchema2.default), _AddressController2.default.store);
router.get("/:address_id", _loginRequired2.default, _AddressController2.default.show);
router.put("/:address_id", _loginRequired2.default, _joiSchemaValidator2.default.call(void 0, _updateAddressSchema2.default), _AddressController2.default.update);
router.delete("/:address_id", _loginRequired2.default, _AddressController2.default.delete);

exports. default = router;
