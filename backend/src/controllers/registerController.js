const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { name, email, password, phone, company } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Thiếu email hoặc password",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        field: "email",
        message: "Email đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      company,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Register success",
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  register,
};