const Customer = require("../models/Customer");

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    res.json(customers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};