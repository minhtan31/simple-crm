const express = require("express");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server running"
  });
});

app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

module.exports = app;