import Sequelize, { Model } from "sequelize";

class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        role: {
          type: Sequelize.STRING,
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
  static associate = (models) => {
    this.hasMany(models.AdministrativeUser, { foreignKey: "role_id" });
  };
}
export default Role;
