const Router = require("express");
const { createOrder } = require("../controllers/order.controller");

const orderRouter = Router();

orderRouter.post("/", createOrder);

module.exports = orderRouter;
