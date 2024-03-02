const { Product } = require("../models");
const { tokenDecoder } = require("../utils/token");

module.exports = class ProductUseCase {
  constructor() {}

  async getAllProducts(token) {
    const decodedUser = tokenDecoder(token);
    const products = await Product.findAll({
      where: { user_id: decodedUser.uuid },
    });

    if (!products) throw new Error("products not found");

    return products;
  }
};
