const logger = require('../middleware/logger');

function errorHandler(err, req, res, next) {
  logger.error(err.stack);

  if (err.status === 404) {
    return res.status(404).json({ errno: 404, errormsg: "api not found" });
  }

  res.status(500).json({ errno: 20001, errormsg: "unexpected error" });
}

module.exports = errorHandler;

