"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Category extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: {
              args: [3, 25],
              msg: "Minimum of three and maximum of twenty-five characters to category",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "categories",
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsToMany(models.Product, {
      foreignKey: "category_id",
      through: "category_product",
      as: "products",
    });
  }
}
exports. default = Category;
