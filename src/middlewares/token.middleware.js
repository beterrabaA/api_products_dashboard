const UserUseCase = require("../useCases/user.usecase.js");

const { tokenDecoder } = require("../utils/token.js");

module.exports = class TokenValidator {
  constructor() {
    this.usecase = new UserUseCase();
  }

  async validateJWT(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Token not found" });

    try {
      const usecase = new UserUseCase();
      const decoded = tokenDecoder(token);

      const loggedUser = await usecase.findUserById(decoded.id);

      if (!loggedUser) {
        return res.status(403).json({ message: "Token must be a valid token" });
      }

      req.userId = loggedUser.id;
      next();
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }
};
