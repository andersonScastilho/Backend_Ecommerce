"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 20],
              msg: "Minimum of six characters and maximum of forty to name.",
            },
          },
        },
        surname: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: "Minimum of three characters to surname.",
            },
          },
        },
        tel: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [9, 14],
              msg: "Minimum of nine digits and maximum of fourteen to tel",
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          unique: { msg: "Email in use" },
          validate: {
            isEmail: {
              msg: "Invalid e-mail",
            }, len: {
              args: [9, 150],
              msg: "Minimum of nine digits and maximum of fourteen to tel",
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
        tableName: "users",
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
  static __initStatic() {this.associate = (models) => {
    this.hasMany(models.Address, { foreignKey: "user_id" })
    this.hasMany(models.Request, { foreignKey: "user_id" })
  }}
} User.__initStatic();
exports. default = User;
