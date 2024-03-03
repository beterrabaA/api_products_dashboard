const { Router } = require("express");
const ProductController = require("../controllers/product.controller.js");
const JTWValidator = require("../middlewares/token.middleware.js");

module.exports = class ProductRoute {
  constructor() {
    this.router = Router();
    this.controller = new ProductController();
    this.jwt = new JTWValidator();
    this.initializeMiddlewares();
    this.initRoutes();
  }

  initializeMiddlewares() {
    this.router.use(this.jwt.validateJWT);
  }

  initRoutes() {
    // get method "/api/product" route
    this.router.get("/product", this.controller.getAll.bind(this.controller));

    // get method "/api/product/:id" route
    this.router.get(
      "/product/:id",
      this.controller.getById.bind(this.controller)
    );

    // post method "/api/product" route
    this.router.post("/product", this.controller.create.bind(this.controller));

    // put method "/api/product/:id" route
    this.router.put(
      "/product/:id",
      this.controller.update.bind(this.controller)
    );
  }
};
