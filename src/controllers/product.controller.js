const ProductUseCase = require("../useCases/product.usecase");

module.exports = class ProductController {
  constructor() {
    this.usecase = new ProductUseCase();
  }

  async getAll(req, res, next) {
    const token = req.headers.authorization;

    try {
      const products = await this.usecase.getAllProducts(token);

      return res.status(200).json(products);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  async getById(req, res, next) {
    const token = req.headers.authorization;
    const productId = req.params.id;

    try {
      const product = await this.usecase.getProductById(token, productId);

      return res.status(200).json(product);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  async create(req, res, next) {
    const token = req.headers.authorization;
    const product = req.body;

    let newProduct;

    try {
      if (product.details) {
        newProduct = await this.usecase.newProductWithDetails(token, product);
      } else if (Array.isArray(product) && product[0].data) {
        newProduct = await this.usecase.newProductWithData(token, product);
      } else {
        newProduct = await this.usecase.newProduct(token, product);
      }

      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(405).json({ message: error.message });
    }
  }

  async update(req, res, next) {
    const token = req.headers.authorization;
    const { id } = req.params;
    const product = req.body;

    let productUpdated;

    try {
      if (product.details) {
        productUpdated = await this.usecase.updateProductWithDetails(
          token,
          id,
          product
        );
      } else if (product.data) {
        productUpdated = await this.usecase.updateProductWithData(
          token,
          id,
          product
        );
      } else {
        productUpdated = await this.usecase.updateProduct(token, id, data);
      }

      return res.status(200).json(productUpdated);
    } catch (error) {
      return res.status(405).json({ message: error.message });
    }
  }
};
