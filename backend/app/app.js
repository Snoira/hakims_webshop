const express = require("express");
const cors = require("cors");
const path = require("path");
const { urlencoded } = require("express");
const productsRouter = require("./routes/product.route.js");
const categoryRouter = require("./routes/category.route.js");
const orderRouter = require("./routes/order.route.js");
const customerRouter = require("./routes/customer.route.js");

const app = express();

app.use(cors("*"));

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/products", productsRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);
app.use("/customers", customerRouter);

app.get("/", (req, res) => res.send("Hello World from /!"));

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "frontend", "dist", "index.html")
  );
});

module.exports = app;
