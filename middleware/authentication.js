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

    // Alternative Code
    // console.log(payload);
    /*
    { userId: '6656bceca0138e812452c6cc',
      name: 'Alex',
      iat: 1716960493,
      exp: 1719552493
    }
     */

    // '-'  to exclude that field from the result
    // const user = User.findById(payload.id).select("-password");
    // req.user = user;

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
};

module.exports = auth;
