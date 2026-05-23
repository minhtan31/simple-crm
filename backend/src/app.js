const express = require("express");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server running"
  });
});

app.use("/api/customers", customerRoutes);

app.use(errorHandler);

module.exports = app;