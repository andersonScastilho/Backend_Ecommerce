import Product from "../models/Product";
import Category from "../models/Category";

class ProductCategoryController {
  async delete(req, res) {
    try {
      const { product_id, category_id } = req.params;

      const product = await Product.findByPk(product_id);

      if (!product) {
        return res.status(400).json({ errors: ["Product not found"] });
      }

      const category = await Category.findByPk(category_id, {
        include: {
          model: Product,
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
export default new ProductCategoryController();
