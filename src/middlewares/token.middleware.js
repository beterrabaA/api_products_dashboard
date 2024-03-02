const UserUseCase = require("../useCases/user.usecase.js");

const { tokenDecoder } = require("../utils/token.js");

module.exports = class TokenValidator {
  constructor() {
    this.useCase = new UserUseCase();
  }

  async validateJWT(req, res, next) {
    const token = req.headers("Authorization");
    if (!token) return res.status(401).json({ message: "Token not found" });

    try {
      const decoded = tokenDecoder(token);
      const loggedUser = await this.useCase.findUserById(decoded.uuid);

      if (!loggedUser) {
        return res.status(403).json({ message: "Token must be a valid token" });
      }

      req.userId = loggedUser.uuid;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token must be a valid token" });
    }
  }
};
