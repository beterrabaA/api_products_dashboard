const crypto = require("crypto");

require("dotenv/config");

const CRYPTO_SALT = process.env.CRYPTO_SALT || "salt";

const hashEncode = (password) => {
  return crypto
    .pbkdf2Sync(password, CRYPTO_SALT, 10000, 12, "sha512") // Ajuste o algoritmo e os parâmetros conforme necessário
    .toString("hex");
};

const hashDecode = (password, hash) => {
  return hashEncode(password) === hash;
};

module.exports = {
  hashDecode,
  hashEncode,
};
