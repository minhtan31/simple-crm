const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  status: {
    type: String,
    default: "New"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Customer", customerSchema);