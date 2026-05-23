const errorHandler = (err, req, res, _next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message
  });
};

module.exports = errorHandler;