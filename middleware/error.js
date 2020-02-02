const errorHandler = (error, req, res, next) => {
  // Log to console for developer
  console.log(error.stack);
  res.status(500).json({ success: false, error: error.message });
};

module.exports = errorHandler;
