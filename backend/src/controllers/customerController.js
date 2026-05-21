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

exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    res.status(201).json(customer);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(customer);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);

    res.json({
      message: "Customer deleted"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

exports.searchCustomer = async (req, res) => {
  try {
    const keyword = req.query.q;

    const customers = await Customer.find({
      name: {
        $regex: keyword,
        $options: "i"
      }
    });

    res.json(customers);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};