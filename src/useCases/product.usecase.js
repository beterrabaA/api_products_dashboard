const { Product } = require("../models");

const { tokenDecoder } = require("../utils/token");

const { randomUUID } = require("crypto");
const {
  prodSchema,
  prodWDtailsSchema,
  prodWDataSchema,
  sProdWDataSchema,
} = require("./validations");

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

    const { error } = prodSchema.validate(product);
    if (error) throw new Error(error.message);

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

    const { error } = prodWDtailsSchema.validate(product);
    if (error) throw new Error(error.message);

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

    const { error } = prodWDataSchema.validate(product);
    if (error) throw new Error(error.message);

    const newProduct = await Product.bulkCreate(product);

    if (!newProduct) {
      throw new Error("failed to bulk create products with data");
    }

    return newProduct;
  }

  async updateProduct(token, id, product) {
    const decodedUser = tokenDecoder(token);

    const { name, brand, model, price, color } = product;

    const { error } = prodSchema.validate(product);
    if (error) throw new Error(error.message);

    const productUpdated = await Product.update(
      {
        name,
        brand,
        model,
        data: [{ price, color }],
      },
      {
        where: { id, userId: decodedUser.id },
      }
    );

    if (!productUpdated) throw new Error("update failed");
  }

  async updateProductWithDetails(token, id, product) {
    const decodedUser = tokenDecoder(token);

    const { name, details, price } = product;
    const { brand, model, color } = details;

    const { error } = prodWDtailsSchema.validate(product);
    if (error) throw new Error(error.message);

    const updatedProduct = await Product.update(
      {
        name,
        brand,
        model,
        data: [{ price, color }],
      },
      {
        where: { id, userId: decodedUser.id },
      }
    );

    if (!updatedProduct) {
      throw new Error("failed to update product with details");
    }
  }

  async updateProductWithData(token, id, product) {
    const decodedUser = tokenDecoder(token);

    const { error } = sProdWDataSchema.validate(product);
    if (error) throw new Error(error.message);

    const updatedProduct = await Product.update(product, {
      where: { id, userId: decodedUser.id },
    });

    if (!updatedProduct) {
      throw new Error("failed to update product with data");
    }
  }

  async deleteProduct(token, id) {
    const decodedUser = tokenDecoder(token);

    await Product.destroy({ where: { id, userId: decodedUser.id } });
  }
};
