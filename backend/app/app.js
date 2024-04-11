const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");
const productsRouter = require("./routes/product.route.js");
const categoryRouter = require("./routes/category.route.js");
const orderRouter = require("./routes/order.route.js");

const app = express();

app.use(
  cors({
    origin: [
      "https://hakims-webshop-frontend.onrender.com",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/products", productsRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);

app.get("/", (req, res) => res.send("Hello World from /!"));

module.exports = app;
