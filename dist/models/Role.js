"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Role extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        role: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 20],
              msg: "Minimum of four characters and maximum of twenty to role",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "roles",
      }
    );
    return this;
  }
  static __initStatic() {this.associate = (models) => {
    this.hasMany(models.AdministrativeUser, { foreignKey: "role_id" });
  }}
} Role.__initStatic();
exports. default = Role;
