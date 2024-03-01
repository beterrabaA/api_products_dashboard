const { Router } = require("express");
const UserControler = require("../controllers/user.controller.js");

module.exports = class UserRoute {
  constructor() {
    this.router = Router();
    this.controller = new UserControler();
    this.initRoutes();
  }

  initRoutes() {
    // get method "/api/user" route
    this.router.post(
      "/user/register",
      this.controller.create.bind(this.controller)
    );
  }
};
