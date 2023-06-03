"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Product extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: {
              args: [3, 50],
              msg: "Minimum of six characters and maximum of forty to name.",
            },
          },
        },
        description: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: "Minimum of six characters and maximum of forty to description.",
            },
          },
        },
        price: {
          type: _sequelize2.default.FLOAT,
          allowNull: false,
        },
        image_key: {
          type: _sequelize2.default.STRING,
          allowNull: true,
        },
        packaging: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [2, 10],
              msg: "Minimum of six characters and maximum of forty to packaging.",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "products",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Category, {
      foreignKey: "product_id",
      through: "category_product",
      as: "categories",
    }),

      this.belongsToMany(models.Request, {
        foreignKey: 'product_id',
        through: "request_products",
        as: "requests"
      })
  }
}

exports. default = Product;
