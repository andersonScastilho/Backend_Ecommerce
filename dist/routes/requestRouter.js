"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

var _RequestController = require('../controllers/RequestController'); var _RequestController2 = _interopRequireDefault(_RequestController);

const router = new (0, _express.Router)()

router.post('/', _loginRequired2.default, _RequestController2.default.store)
router.get('/', _loginRequired2.default, _RequestController2.default.index)
router.delete('/:request_id', _loginRequired2.default, _RequestController2.default.delete)

exports. default = router