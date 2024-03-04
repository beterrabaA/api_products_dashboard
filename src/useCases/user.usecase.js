const { User } = require("../models");
const { hashEncode, hashDecode } = require("../utils/hash");
const { userRegisterSchema, userLoginSchema } = require("./validations");

const { randomUUID } = require("crypto");

module.exports = class UserUseCase {
  constructor() {
    this.model = new User();
  }

  async createUser(name,email, password) {
    const random = randomUUID();

    const { error } = userRegisterSchema.validate({ name, email, password });
    if (error) throw new Error(error.message);

    const hashedPassword = hashEncode(password);
    const newUser = await User.create({
      id: random,
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  }

  async findUserById(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) throw new Error("User not found");

    return user;
  }

  async login(email, password) {

    const { error } = userLoginSchema.validate({ email, password });
    if (error) throw new Error(error.message);

    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error("user not found");

    const validatedPassword = hashDecode(password, user.password);
    if (!validatedPassword) throw new Error("password invalid");

    return user;
  }
};
