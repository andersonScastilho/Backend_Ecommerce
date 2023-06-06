"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Category = require('../models/Category'); var _Category2 = _interopRequireDefault(_Category);
var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);

class ProductController {
  async store(req, res) {
    try {
      const { description, price, packaging, image_key, category_id, name } =
        req.body;

      if (!description || !price || !packaging || !category_id || !name) {
        return res.status(400).json({
          errors: ['Missing data']
        })
      }

      if (typeof price !== 'number') {
        return res.status(400).json({
          errors: ['Provide a valid price']
        })
      }

      if (typeof category_id !== 'number') {
        return res.status(400).json({
          errors: ['Provide a valid category']
        })
      }

      const category = await _Category2.default.findByPk(category_id);

      if (!category) {
        return res.status(404).json({ errors: ["Category not found"] });
      }

      const product = await _Product2.default.create({
        description,
        price,
        packaging,
        image_key,
        name
      })

      await category.addProduct(product);

      return res.status(200).json({
        product,
        category: {
          name: category.name
        }
      });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const { product_id } = req.params;
      const { name, description, price, image_key, packaging } = req.body

      if (!product_id) {
        return res.status(400).json({ errors: ["Product is required"] });
      }

      if (!name && !description && !price && !image_key && !packaging) {
        return res.status(400).json({
          errors: ['Missing data']
        })
      }

      if (typeof price !== 'number') {
        return res.status(400).json({
          errors: ['Provide a valid price']
        })
      }

      const product = await _Product2.default.findByPk(product_id);

      await product.update({
        name, description, price, packaging, image_key
      });

      return res.status(200).json({
        product
      });

    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const { product_id } = req.params;

      if (!product_id) {
        return res.status(400).json({ errors: ["Product is required"] });
      }
      const product = await _Product2.default.findByPk(product_id);

      if (!product) {
        return res.status(404).json({ errors: ["Product not found"] });
      }

      product.destroy();

      return res.status(200).json({
        message: 'Deleted product'
      });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      const { product_id } = req.params;

      if (!product_id) {
        return res.status(400).json({ errors: ["Product is required"] });
      }

      const product = await _Product2.default.findByPk(product_id, {
        attributes: ['name', 'description', 'price', 'packaging'],
        include: {
          attributes: ['name', 'id'],
          model: _Category2.default,
          through: {
            attributes: []
          },
          as: 'categories'
        }
      });

      if (!product) {
        return res.status(404).json({ errors: ["Product not found"] });
      }

      return res.status(200).json({
        product,
      });

    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const products = await _Product2.default.findAll({
        attributes: ["name", "description", "id", "price", "image_key"],
        include: {
          attributes: ['name', 'id'],
          model: _Category2.default,
          through: { attributes: [] },
          as: 'categories'
        }
      });

      return res.status(200).json(products);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
exports. default = new ProductController();
