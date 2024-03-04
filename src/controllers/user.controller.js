const UserUseCase = require("../useCases/user.usecase.js");
const { tokenGenerator } = require("../utils/token.js");

module.exports = class UserController {
  constructor() {
    this.usecase = new UserUseCase();
  }

  async create(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const createdUser = await this.usecase.createUser(name,email, password);

      return res.status(201).json(createdUser);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await this.usecase.login(email, password);
      const token = tokenGenerator({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }
};
