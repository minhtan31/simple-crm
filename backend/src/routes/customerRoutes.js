const express = require("express");

const {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomer
} = require("../controllers/customerController");

const router = express.Router();

router.get("/", getCustomers);

router.post("/", createCustomer);

router.put("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

router.get("/search", searchCustomer);

module.exports = router;