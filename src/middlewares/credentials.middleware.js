module.exports = class Credentials {
  validateCredentials = async (req, res, next) => {
    const { email, password } = req.body;

    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email === "" || !emailFormat.test(email)) {
      return res.status(401).json({ message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(401).json({ message: "Invalid password" });
    }
    next();
  };
};
