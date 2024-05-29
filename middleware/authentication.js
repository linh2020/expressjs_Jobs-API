const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");
const { use } = require("express/lib/router");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Invalid Authentication");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
};

module.exports = auth;
