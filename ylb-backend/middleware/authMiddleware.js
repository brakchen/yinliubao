const jwt = require('jsonwebtoken');
const ErrorNoEnums = require('../datadict/enums/errorNoEnums');
const logger = require('../utils/logger');
const excludeUrls = ['/health','/ylb/tokenVerify','/api/users/login','/api/users/register'];
function verifyToken(req, res, next) {
    logger.info('verifyToken:%s,excludeUrls:%s',req.url,excludeUrls.includes(req.url));
    if(excludeUrls.includes(req.url)){
        next();
    }else{
        logger.info('verifyToken:',req.url);

        const token = req.header('Authorization');
        if (!token) return res.json(ErrorNoEnums.INVALID_TOKEN);
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.userId = decoded.userId;
          next();
        } catch (error) {
          res.json(ErrorNoEnums.INVALID_TOKEN);
        }
    }

}

module.exports = verifyToken;