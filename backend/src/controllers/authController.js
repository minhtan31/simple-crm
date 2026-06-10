const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Sai email"
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!checkPassword) {
      return res.status(400).json({
        message: "Sai mật khẩu"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      "secretkey",
      {
        expiresIn: "1d"
      }
    );

    res.json({
      token,
      user
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  register,
  login
};