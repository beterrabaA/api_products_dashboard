const { sign, verify } = require("jsonwebtoken");

require("dotenv/config");

const secret = process.env.JWT_SECRET;

const tokenGenerator = (payload) => sign(payload, secret);

const tokenDecoder = (token) => verify(token, secret);

module.exports = {
  tokenGenerator,
  tokenDecoder,
};
