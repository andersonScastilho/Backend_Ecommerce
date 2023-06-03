"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class RequestProduct extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                quantity: {
                    type: _sequelize2.default.INTEGER,
                    allowNull: false,
                },
                product_id: {
                    type: _sequelize2.default.INTEGER,
                    allowNull: false,
                },
                nro_request: {
                    type: _sequelize2.default.INTEGER,
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
exports. default = RequestProduct;
