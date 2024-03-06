const express = require("express");
const cors = require("cors");
const UserRoute = require("./routes/user.route.js");
const ProductRoute = require("./routes/product.route.js");

require("dotenv/config");

const app = express();
const userRoute = new UserRoute();
const productRoute = new ProductRoute();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send({ message: "Hello World" });
});
app.use("/", userRoute.router);
app.use("/", productRoute.router);

app.listen(this.port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
