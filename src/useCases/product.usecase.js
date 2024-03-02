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

  async newProduct(token, product) {
    console.log("foi");
    const random = randomUUID();

    const { name, brand, model, price, color } = product;
    const decodedUser = tokenDecoder(token);
    const stringProduct = JSON.stringify({ price, color });

    const newProduct = await Product.create({
      id: random,
      name,
      brand,
      model,
      data: [stringProduct],
      userId: decodedUser.id,
    });

    return newProduct;
  }
};
