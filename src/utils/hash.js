const crypto = require("crypto");

const CRYPTO_SALT = process.env.CRYPTO_SALT || "salt";

export const hashEncode = (password) => {
  return crypto
    .pbkdf2Sync(password, CRYPTO_SALT, 10000, 12, "sha512") // Ajuste o algoritmo e os parâmetros conforme necessário
    .toString("hex");
};

export const hashDecode = (password, hash) => {
  return hashEncode(password) === hash;
};
