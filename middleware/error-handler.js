const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  // let customError = {
  //   statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, // 500
  //   msg: err.message || "Something went wrong, please try again!",
  // };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};
module.exports = errorHandlerMiddleware;
