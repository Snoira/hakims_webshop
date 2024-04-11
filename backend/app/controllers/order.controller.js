const Order = require("../models/order.model");
const Product = require("../models/product.model");

async function createOrder(req, res) {
  try {
    const { orderNummer, date, totalPriceWithTax, orderItems } = req.body;

    if (!orderNummer || !date || !orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
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

    const totalOrderPrice = populatedOrderItems.reduce(
      (acc, item) => acc + item.totalProductPrice,
      0
    );

    const VAT = 0.25;
    const totalPriceWithVat = totalOrderPrice * (1 + VAT);

    const newOrder = new Order({
      orderNummer: orderNummer,
      date: formattedDate,
      totalPrice: totalOrderPrice,
      totalPriceWithTax: totalPriceWithVat,
      orderItems: populatedOrderItems,
    });

    console.log("newOrder: ", newOrder);
    await newOrder.save();

    res.status(201).send(newOrder);
  } catch (error) {
    console.log("fel i createOrder:", error);
    res.status(400).json({ message: "Error in createOrder" });
  }
}

module.exports = { createOrder };
