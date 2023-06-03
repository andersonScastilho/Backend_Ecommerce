"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Request extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        price_total: {
          type: _sequelize2.default.FLOAT,
          allowNull: false,
        },
        user_id: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
        },
        address_id: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
        },
        payment_id: {
          type: _sequelize2.default.STRING
        },
        payment_status: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          defaultValue: 'unpaid'
        }
      },
      {
        sequelize,
        tableName: "requests",
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" }),
      this.belongsTo(models.Address, { foreignKey: 'address_id' }),
      this.belongsToMany(models.Product, {
        foreignKey: 'nro_request',
        through: "request_products",
        as: "products"
      })

  }
}
exports. default = Request;
