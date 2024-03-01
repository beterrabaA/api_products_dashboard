const { User } = require("../models");
const { hashEncode, hashDecode } = require("../utils/hash");

module.exports = class UserUseCase {
  constructor() {
    this.model = new User();
  }

  async createUser(username, email, password) {
    const hashedPassword = hashEncode(password);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return newUser;
  }

  async findUserById(uuid) {
    const user = await User.findByPk(uuid, {
      attributes: { exclude: ["password"] },
    });

    if (!user) throw new Error("User not found");

    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error("user not found");

    const validatedPassword = hashDecode(password, user.password);
    if (!validatedPassword) throw new Error("password invalid");

    return user;
  }
};
