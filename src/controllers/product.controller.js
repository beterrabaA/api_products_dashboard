const ProductUseCase = require("../useCases/product.usecase");

module.exports = class ProductController {
  constructor() {
    this.usecase = new ProductUseCase();
  }

  async getAllProducts(req, res, next) {
    const token = req.headers("Authorization");

    try {
      const products = await this.usecase.getAllProducts(token);

      return res.status(200).json(products);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
};
