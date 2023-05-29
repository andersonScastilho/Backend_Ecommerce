import Sequelize, { Model } from "sequelize";

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: {
              args: [3, 25],
              msg: "Minimum of three and maximum of twenty-five characters to category",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "categories",
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsToMany(models.Product, {
      foreignKey: "category_id",
      through: "category_product",
      as: "products",
    });
  }
}
export default Category;
