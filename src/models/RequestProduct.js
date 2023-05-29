import Sequelize, { Model } from "sequelize";

class RequestProduct extends Model {
    static init(sequelize) {
        super.init(
            {
                quantity: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                product_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                nro_request: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: "request_products",
            }
        );
        return this;
    }
}
export default RequestProduct;
