const { Router } = require("express");
const UserControler = require("../controllers/user.controller.js");
const Credentials = require("../middlewares/credentials.middleware.js");

module.exports = class UserRoute {
  constructor() {
    this.router = Router();
    this.controller = new UserControler();
    this.credentials = new Credentials();
    this.initRoutes();
  }

  initRoutes() {
    // get method "/api/user" route
    this.router.post(
      "/user/register",
      this.credentials.validateCredentials,
      this.controller.create.bind(this.controller)
    );

    this.router.post(
      "/user/login",
      this.credentials.validateCredentials,
      this.controller.login.bind(this.controller)
    );
  }
};
