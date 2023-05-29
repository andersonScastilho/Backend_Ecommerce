import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

class AdministrativeUser extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [5, 15],
              msg: "Minimum of five characters and maximum of fifteen to username",
            },
          },
        },
        fullname: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [5, 255],
              msg: "Minimum of five characters to fullname",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          validate: {
            isEmail: {
              msg: "Invalid e-mail",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
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
        admUser.password_hash = await bcryptjs.hash(admUser.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: "role_id" });
  }
}
export default AdministrativeUser;
