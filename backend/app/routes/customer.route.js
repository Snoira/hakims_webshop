const Router = require("express");
const { createCustomer } = require("../controllers/customer.controller");

const customerRouter = Router();

customerRouter.post("/checkout", createCustomer);

module.exports = customerRouter;
