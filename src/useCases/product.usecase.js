const { Product } = require("../models");

const { tokenDecoder } = require("../utils/token");

const { randomUUID } = require("crypto");

module.exports = class ProductUseCase {
  constructor() {}

  async getAllProducts(token) {
    const decodedUser = tokenDecoder(token);

    const products = await Product.findAll({
      where: { userId: decodedUser.id },
    });

    if (!products) throw new Error("products not found");

    return products;
  }

  async getProductById(id) {
    const product = await Product.findByPk(id);

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

    return newProduct;
  }
};
