const UserUseCase = require("../useCases/user.usecase.js");

module.exports = class UserController {
  constructor() {
    this.usecase = new UserUseCase();
  }

  async create(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const createdUser = await this.usecase.createUser(
        username,
        email,
        password
      );

      return res.status(200).json(createdUser);
    } catch (error) {
      res.status(409).json({ message: "User already registered" });
    }
  }
};
