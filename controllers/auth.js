const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
// const bcrypt = require("bcryptjs");

// Register Controller Setup
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

// Login Controller Setup
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide email and password"); // 400

  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid Credentials"); // 401

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid Credentials"); // 401

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
