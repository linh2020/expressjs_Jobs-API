const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
// const { BadRequestError } = require("../errors/index");
// const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  // const { name, email, password } = req.body;
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const tempUser = { name, email, password: hashedPassword };

  // Optional
  // const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequestError("Please provide name, email and password");
  // }

  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res, next) => {
  res.send("login user");
};

module.exports = { register, login };
