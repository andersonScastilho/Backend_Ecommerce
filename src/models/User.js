import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 20],
              msg: "Minimum of six characters and maximum of forty to name.",
            },
          },
        },
        surname: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: "Minimum of three characters to surname.",
            },
          },
        },
        tel: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [9, 14],
              msg: "Minimum of nine digits and maximum of fourteen to tel",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
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
        tableName: "users",
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
  static associate = (models) => {
    this.hasMany(models.Adress, { foreignKey: "user_id" })
    this.hasMany(models.Request, { foreignKey: "user_id" })
  };
}
export default User;
