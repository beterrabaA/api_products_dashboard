const express = require("express");
const cors = require("cors");
const UserRoute = require("./routes/user.route.js");
const ProductRoute = require("./routes/product.route.js");

require("dotenv/config");

module.exports = class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000; // get .env port
    this.corsConfig = {
      origin: "*",
      credential: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    };
    this.userRoute = new UserRoute();
    this.productRoute = new ProductRoute();
    this.middlewaresInitialize();
    this.initializeRoutes();
  }

  middlewaresInitialize() {
    this.app.use(express.json());
    this.app.options("", cors(this.corsConfig));
    this.app.use(cors(this.corsConfig));
    this.app.use(express.urlencoded({ extended: true }));
  }

  // initialize root /api route
  initializeRoutes() {
    this.app.use("/api", this.userRoute.router);
    this.app.use("/api", this.productRoute.router);
  }

  // initiate server listener
  listen() {
    this.app.listen(this.port, () =>
      console.log(`server is running at http://localhost:${this.port} `)
    );
  }
};
