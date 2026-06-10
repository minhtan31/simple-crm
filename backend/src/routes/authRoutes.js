const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const registerController = require("../controllers/registerController");

router.get("/test", (req, res) => {
  res.json({
    message: "Auth route working"
  });
});

router.post("/register", registerController.register);
router.post("/login", authController.login);

module.exports = router;