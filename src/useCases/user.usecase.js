const { User } = require("../models");
const { hashEncode } = require("../utils/hash");

module.exports = class UserUseCase {
  constructor() {}

  async createUser(username, email, password) {
    const hashedPassword = hashEncode(password);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return newUser;
  }
};
