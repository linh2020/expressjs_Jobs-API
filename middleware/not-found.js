const notFoundMiddleware = (req, res, next) => {
  try {
    res.status(404).json({ msg: `Route does not exist!` });
  } catch (error) {
    console.log(error);
  }
};

module.exports = notFoundMiddleware;
