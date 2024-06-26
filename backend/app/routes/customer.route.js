const Router = require("express");
const { createCustomer } = require("../controllers/customer.controller");

const customerRouter = Router();

customerRouter.post("/", createCustomer);

module.exports = customerRouter;
