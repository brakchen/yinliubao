const logger = require('../middleware/logger');
const ErrorNoEnums = require('../datadict/enums/errorNoEnums');
function errorHandler(err, req, res, next) {
  logger.error(err.stack);
  if(err.name === 'UnauthorizedError'){
    return res.status(401).json(ErrorNoEnums.INVALID_TOKEN);
  }
  if (err.status === 404) {
    return res.status(404).json({ errno: 404, errormsg: "api not found" });
  }

  res.status(500).json({ errno: 20001, errormsg: "unexpected error" });
}

module.exports = errorHandler;

