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

  async newProduct(req, res, next) {
    const token = req.headers("Authorization");
    const product = req.body;

    try {
      const newProduct = await this.usecase.newProduct(token, product);

      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(405).json({ message: "something went wrong" });
    }
  }
};
