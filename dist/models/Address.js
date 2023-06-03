"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Address extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        country: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 20],
              msg: "Minimum of four characters and maximum of twenty to country",
            },
          },
        },
        state: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 20],
              msg: "Minimum of four characters and maximum of twenty to state",
            },
          },
        },
        city: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 20],
              msg: "Minimum of four characters and maximum of twenty to city",
            },
          },
        },
        neighborhood: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 50],
              msg: "Minimum of four characters and maximum of fifty to neighborhood",
            },
          },
        },
        street: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 100],
              msg: "Minimum of four characters and maximum of hundred to street",
            },
          },
        },
        complement: {
          type: _sequelize2.default.STRING,
          validate: {
            len: {
              args: [4, 20],
              msg: "Minimum of four characters and maximum of twenty complement",
            },
          },
        },
        address_number: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
        },
        zip_code: { type: _sequelize2.default.STRING, allowNull: false },
        user_id: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "address",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" }),
      this.belongsToMany(models.Request, { foreignKey: "address_id", through: 'requests' })

  }
}

exports. default = Address;
