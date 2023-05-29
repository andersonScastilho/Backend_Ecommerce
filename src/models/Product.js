import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: {
              args: [3, 50],
              msg: "Minimum of six characters and maximum of forty to name.",
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: "Minimum of six characters and maximum of forty to description.",
            },
          },
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        image_key: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        packaging: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [2, 10],
              msg: "Minimum of six characters and maximum of forty to packaging.",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "products",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Category, {
      foreignKey: "product_id",
      through: "category_product",
      as: "categories",
    }),

      this.belongsToMany(models.Request, {
        foreignKey: 'product_id',
        through: "request_products",
        as: "requests"
      })
  }
}

export default Product;
