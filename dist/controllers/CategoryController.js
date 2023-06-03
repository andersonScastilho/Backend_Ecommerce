"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Category = require('../models/Category'); var _Category2 = _interopRequireDefault(_Category);

class CategoryController {
  async store(req, res) {
    try {
      const name = req.body.name.toLowerCase();

      if (!name) {
        return res.status(401).json({ errors: ["name is required"] });
      }

      const category = await _Category2.default.create({ name });

      return res.status(200).json({
        category
      });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    const { category_id } = req.params

    const category = await _Category2.default.findByPk(category_id)

    if (!category) {
      return res.status(400).json({
        errors: ['Category not found']
      })
    }

    await category.destroy()


    return res.status(200).json({
      message: ['Deleted category']
    })
  }
}

exports. default = new CategoryController();
