const errorHandler = (err, req, res, next) => {
  res.status(403);
  res.json({ error: err.message });
};

module.exports = errorHandler;
