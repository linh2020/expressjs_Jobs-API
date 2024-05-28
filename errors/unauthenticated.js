const { CustomAPIError } = require("../../ExpressJS_JWT-Authentication/errors");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED; // 401
  }
}

module.exports = UnauthenticatedError;
