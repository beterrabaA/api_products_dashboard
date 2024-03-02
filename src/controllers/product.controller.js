const ProductUseCase = require("../useCases/product.usecase");

module.exports = class ProductController {
  constructor() {
    this.usecase = new ProductUseCase();
  }

  async getAllProducts(req, res, next) {
    const token = req.headers.authorization;

    try {
      const products = await this.usecase.getAllProducts(token);

      return res.status(200).json(products);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  async newProduct(req, res, next) {
    const token = req.headers.authorization;
    const product = req.body;

    let newProduct;

    try {
      if (product.details) {
        newProduct = await this.usecase.newProductWithDetails(token, product);
      } else if (product.data) {
        newProduct = await this.usecase.newProductWithData(token, product);
        return res.status(201).json(newProduct);
      } else {
        newProduct = await this.usecase.newProduct(token, product);
      }

      const parsedData = JSON.parse(newProduct.data);
      newProduct.data = [parsedData];
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(405).json({ message: error.message });
    }
  }
};
