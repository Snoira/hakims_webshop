const Router = require("express");
const { createCustomer } = require("../controllers/customer.controller");

const customerRouter = Router();

orderRouter.post("/checkout", createCustomer);

module.exports = customerRouter;
