import Sequelize, { Model } from "sequelize";

class Adress extends Model {
  static init(sequelize) {
    super.init(
      {
        country: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 20],
              msg: "Minimum of four characters and maximum of twenty to country",
            },
          },
        },
        state: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 20],
              msg: "Minimum of four characters and maximum of twenty to state",
            },
          },
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 20],
              msg: "Minimum of four characters and maximum of twenty to city",
            },
          },
        },
        neighborhood: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 50],
              msg: "Minimum of four characters and maximum of fifty to neighborhood",
            },
          },
        },
        street: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 100],
              msg: "Minimum of four characters and maximum of hundred to street",
            },
          },
        },
        complement: {
          type: Sequelize.STRING,
          validate: {
            len: {
              args: [4, 20],
              msg: "Minimum of four characters and maximum of twenty complement",
            },
          },
        },
        adress_number: {
          type: Sequelize.INTEGER,
          validate: {
            isInt: {
              msg: "adress number is required",
            },
          },
        },
        cep: { type: Sequelize.STRING, allowNull: false },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "adress",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" }),
      this.belongsToMany(models.Request, { foreignKey: "adress_id", through: 'requests' })

  }
}

export default Adress;
