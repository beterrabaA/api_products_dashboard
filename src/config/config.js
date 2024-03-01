require("dotenv/config");

const options = {
  username: process.env.POSTGRES_USER || "root",
  password: process.env.POSTGRES_PASSWORD || "root",
  database: process.env.POSTGRES_DATABASE || "crud_sequelize",
  host: process.env.POSTGRES_HOST || "127.0.0.1",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // This is important
      rejectUnauthorized: false, // You might need to set this to true in production
    },
  },
};

module.exports = {
  ...options,
};
