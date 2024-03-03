const { Product } = require("../models");

const { tokenDecoder } = require("../utils/token");

const { randomUUID } = require("crypto");

module.exports = class ProductUseCase {
  constructor() {}

  async getAllProducts(token) {
    const decodedUser = tokenDecoder(token);

    const products = await Product.findAll({
      where: { userId: decodedUser.id },
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
    });

    if (!products) throw new Error("products not found");

    return products;
  }

  async getProductById(token, id) {
    const decodedUser = tokenDecoder(token);
    const product = await Product.findOne({
      where: { id, userId: decodedUser.id },
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
    });

    if (!product) throw new Error("product not found");

    return product;
  }

  async newProduct(token, product) {
    const random = randomUUID();

    const { name, brand, model, price, color } = product;
    const decodedUser = tokenDecoder(token);

    const newProduct = await Product.create({
      id: random,
      name,
      brand,
      model,
      data: [{ price, color }],
      userId: decodedUser.id,
    });

    if (!newProduct) throw new Error("product not created");

    return newProduct;
  }

  async newProductWithDetails(token, product) {
    const random = randomUUID();
    const { name, details, price } = product;
    const { brand, model, color } = details;

    const decodedUser = tokenDecoder(token);

    const newProduct = await Product.create({
      id: random,
      name,
      brand,
      model,
      data: [{ price, color }],
      userId: decodedUser.id,
    });

    if (!newProduct) throw new Error("failed to create product with details");

    return newProduct;
  }

  async newProductWithData(token, product) {
    const decodedUser = tokenDecoder(token);

    product.forEach((element) => {
      element.id = randomUUID();
      element.userId = decodedUser.id;
    });

    const newProduct = await Product.bulkCreate(product);

    if (!newProduct) {
      throw new Error("failed to bulk create products with data");
    }

    return newProduct;
  }
};
