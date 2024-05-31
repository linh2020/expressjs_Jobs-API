const notFoundMiddleware = (req, res, next) => {
  try {
    res.status(404).json({ msg: `Route does not exist!` }); // 404 Not Found
  } catch (error) {
    console.log(error);
  }
};

module.exports = notFoundMiddleware;
