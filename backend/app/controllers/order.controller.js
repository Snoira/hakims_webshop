const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");

async function createOrder(req, res) {
  try {
    const { date, orderItems, customerInfo } = req.body;

    const missingFields = [];

    // if (!orderNummer) {
    //   missingFields.push("orderNummer");
    // }

    if (!date) {
      missingFields.push("date");
    }

    if (!orderItems || orderItems.length === 0) {
      missingFields.push("orderItems");
    }

    if (!customerInfo) {
      missingFields.push("customerInfo");
    }

    if (missingFields.length > 0) {
      return res

        .status(400)

        .json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
    }

    // Hämta dagens datum
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    // Hämta data från produktkollektionen
    const populatedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        const totalProductPrice = product.price * item.quantity;

        return {
          productId: product._id,
          name: product.name,
          quantity: item.quantity,
          price: product.price,
          totalProductPrice: totalProductPrice,
        };
      })
    );

    // Hämta kunddata till ordern
    const savedCustomerInfo = await Promise.all(
      customerInfo.map(async (cust) => {
        const customer = await Customer.findById(cust.customerId);
        if (!customer) {
          throw new Error(`Customer with ID ${cust.customerId} not found`);
        }

        return {
          customerId: customer._id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          address: customer.address,
        };
      })
    );

    const totalOrderPrice = populatedOrderItems.reduce(
      (acc, item) => acc + item.totalProductPrice,
      0
    );

    const VAT = 0.25;
    const totalPriceWithVat = totalOrderPrice * (1 + VAT);

    const generateOrderNumber = () => {
      return Math.floor(Math.random() * 1000000);
    };

    const newOrder = new Order({
      orderNummer: generateOrderNumber(),
      date: formattedDate,
      totalPrice: totalOrderPrice,
      totalPriceWithTax: totalPriceWithVat,
      orderItems: populatedOrderItems,
      customerInfo: savedCustomerInfo,
    });

    console.log("newOrder: ", newOrder);
    await newOrder.save();

    res.status(201).send(newOrder);
  } catch (error) {
    console.log("fel i createOrder:", error.message);
    res.status(400).json({ message: `Error in createOrder: ${error.message}` });
  }
}

module.exports = { createOrder };
