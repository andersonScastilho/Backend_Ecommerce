"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _PaymentController = require('../controllers/PaymentController'); var _PaymentController2 = _interopRequireDefault(_PaymentController);

const router = new (0, _express.Router)();

router.post("/:nro_request", _loginRequired2.default, _PaymentController2.default.store);

exports. default = router;
