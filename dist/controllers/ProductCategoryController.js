"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);
var _Category = require('../models/Category'); var _Category2 = _interopRequireDefault(_Category);

class ProductCategoryController {
  async delete(req, res) {
    try {
      const { product_id, category_id } = req.params;

      const product = await _Product2.default.findByPk(product_id);

      if (!product) {
        return res.status(400).json({ errors: ["Product not found"] });
      }

      const category = await _Category2.default.findByPk(category_id, {
        include: {
          model: _Product2.default,
          as: 'products'
        }
      });

      if (!category) {
        return res.status(400).json({ errors: ["Category not found"] });
      }

      const categoryProductExist = category.products.some((item) => {
        return item.id === +product_id
      })

      if (categoryProductExist !== true) {
        return res.status(400).json({
          errors: ['This product does not exist in this category']
        })
      }

      await category.removeProduct(product);

      return res.status(200).json({
        message: 'Category removed'
      });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
exports. default = new ProductCategoryController();
