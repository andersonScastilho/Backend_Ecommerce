"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _nodecron = require('node-cron'); var _nodecron2 = _interopRequireDefault(_nodecron);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _expressratelimit = require('express-rate-limit'); var _expressratelimit2 = _interopRequireDefault(_expressratelimit);

_dotenv2.default.config();

var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

require('./database');

var _VerifyPayments = require('./services/VerifyPayments'); var _VerifyPayments2 = _interopRequireDefault(_VerifyPayments);

var _admTokenRoutes = require('./routes/admTokenRoutes'); var _admTokenRoutes2 = _interopRequireDefault(_admTokenRoutes);
var _admUserRoutes = require('./routes/admUserRoutes'); var _admUserRoutes2 = _interopRequireDefault(_admUserRoutes);
var _addressRoutes = require('./routes/addressRoutes'); var _addressRoutes2 = _interopRequireDefault(_addressRoutes);
var _categoryRoutes = require('./routes/categoryRoutes'); var _categoryRoutes2 = _interopRequireDefault(_categoryRoutes);
var _imageS3bucket = require('./routes/imageS3bucket'); var _imageS3bucket2 = _interopRequireDefault(_imageS3bucket);
var _productCategoryRoutes = require('./routes/productCategoryRoutes'); var _productCategoryRoutes2 = _interopRequireDefault(_productCategoryRoutes);
var _productRoutes = require('./routes/productRoutes'); var _productRoutes2 = _interopRequireDefault(_productRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _paymentRoutes = require('./routes/paymentRoutes'); var _paymentRoutes2 = _interopRequireDefault(_paymentRoutes);
var _requestRouter = require('./routes/requestRouter'); var _requestRouter2 = _interopRequireDefault(_requestRouter);

var _swaggeruiexpress = require('swagger-ui-express'); var _swaggeruiexpress2 = _interopRequireDefault(_swaggeruiexpress);
var _swaggerjson = require('./swagger.json'); var _swaggerjson2 = _interopRequireDefault(_swaggerjson);

_dotenv2.default.config();


class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
    this.jobs()
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, ));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_helmet2.default.call(void 0, ))
    this.app.use(_expressratelimit2.default.call(void 0, {
      windowMs: 15 * 60 * 1000,
      max: 100
    }))
    this.app.use("/api-docs", _swaggeruiexpress2.default.serve, _swaggeruiexpress2.default.setup(_swaggerjson2.default));
  }

  routes() {
    this.app.use("/users", _userRoutes2.default);
    this.app.use("/tokens", _tokenRoutes2.default);
    this.app.use("/address", _addressRoutes2.default);
    this.app.use("/images", _imageS3bucket2.default);
    this.app.use("/products", _productRoutes2.default);
    this.app.use("/categories", _categoryRoutes2.default);
    this.app.use("/productcategory", _productCategoryRoutes2.default);
    this.app.use("/admtokens", _admTokenRoutes2.default);
    this.app.use("/admUsers", _admUserRoutes2.default);
    this.app.use("/payment", _paymentRoutes2.default);
    this.app.use('/requests', _requestRouter2.default)
  }

  jobs() {
    _nodecron2.default.schedule('*/5 * * * *', () => {

      _VerifyPayments2.default.call(void 0, )
    })
  }
}
exports. default = new App().app;
