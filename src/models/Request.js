import Sequelize, { Model } from "sequelize";

class Request extends Model {
  static init(sequelize) {
    super.init(
      {
        price_total: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        address_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        payment_id: {
          type: Sequelize.STRING
        },
        payment_status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'unpaid'
        }
      },
      {
        sequelize,
        tableName: "requests",
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" }),
      this.belongsTo(models.Address, { foreignKey: 'address_id' }),
      this.belongsToMany(models.Product, {
        foreignKey: 'nro_request',
        through: "request_products",
        as: "products"
      })

  }
}
export default Request;
