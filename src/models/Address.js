import Sequelize, { Model } from "sequelize";

class Address extends Model {
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
        address_number: {
          type: Sequelize.INTEGER,
          validate: {
            isInt: {
              msg: "address number is required",
            },
          },
        },
        zip_code: { type: Sequelize.STRING, allowNull: false },
        user_id: {
          type: Sequelize.INTEGER,
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

export default Address;
