const express = require("express");
const cors = require("cors");
const UserRoute = require("./routes/user.route.js");
const ProductRoute = require("./routes/product.route.js");

require("dotenv/config");

module.exports = class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000; // get .env port
    this.userRoute = new UserRoute();
    this.productRoute = new ProductRoute();
    this.middlewaresInitialize();
    this.initializeRoutes();
  }

  middlewaresInitialize() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
  }

  // initialize root /api route
  initializeRoutes() {
    this.app.get("/", (_req, res) => {
      res.send({ message: "Hello World" });
    });
    this.app.use("/", this.userRoute.router);
    this.app.use("/", this.productRoute.router);
  }

  // initiate server listener
  listen() {
    this.app.listen(this.port, () =>
      console.log(`server is running at http://localhost:${this.port} `)
    );
  }
};
