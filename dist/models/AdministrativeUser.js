"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class AdministrativeUser extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        role_id: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
        },
        username: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [5, 15],
              msg: "Minimum of five characters and maximum of fifteen to username",
            },
          },
        },
        fullname: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [5, 255],
              msg: "Minimum of five characters to fullname",
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          validate: {
            isEmail: {
              msg: "Invalid e-mail",
            },
          },
        },
        password_hash: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
        },
        password: {
          type: _sequelize2.default.VIRTUAL,
          allowNull: false,
          validate: {
            len: {
              args: [6, 50],
              msg: "Minimum of six characters to password",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "administratives_users",
      }
    );

    this.addHook("beforeSave", async (admUser) => {
      if (admUser.password) {
        admUser.password_hash = await _bcryptjs2.default.hash(admUser.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: "role_id" });
  }
}
exports. default = AdministrativeUser;
