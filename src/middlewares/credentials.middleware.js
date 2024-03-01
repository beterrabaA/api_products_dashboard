module.exports = class Credentials {
  validateCredentials = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (username.length < 3) {
      return res
        .status(401)
        .json({ message: "username must be more than 3 characters" });
    }

    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email === "" || !emailFormat.test(email)) {
      return res.status(401).json({ message: "invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(401)
        .json({ message: "password must be more than 6 characters" });
    }
    next();
  };
};
