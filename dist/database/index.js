"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);
var _Category = require('../models/Category'); var _Category2 = _interopRequireDefault(_Category);
var _AdministrativeUser = require('../models/AdministrativeUser'); var _AdministrativeUser2 = _interopRequireDefault(_AdministrativeUser);
var _Role = require('../models/Role'); var _Role2 = _interopRequireDefault(_Role);
var _Request = require('../models/Request'); var _Request2 = _interopRequireDefault(_Request);
var _RequestProduct = require('../models/RequestProduct'); var _RequestProduct2 = _interopRequireDefault(_RequestProduct);

const models = [
  _User2.default,
  _Address2.default,
  _Product2.default,
  _Category2.default,
  _AdministrativeUser2.default,
  _Role2.default,
  _Request2.default,
  _RequestProduct2.default
];

const connection = new (0, _sequelize2.default)(_database2.default);
models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);

//Comando para criar migrates
//npx sequelize db:migration:create --name=products
//npx sequelize db:migrate

//Comando para criar seeds
//npx sequelize seed:generate --name crirar-usuarios
//npx sequelize db:seed:all
