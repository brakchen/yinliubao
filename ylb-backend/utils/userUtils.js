const bcrypt = require('bcrypt');
const logger = require('./logger');
function validatePassword(user, password) {
    logger.info(`validatePassword ${password} ${user.password}`);
    return bcrypt.compare(password, user.password);
}

function hashPassword(password) {
    const saltRounds = 10; // 通常在 10 和 12 之间
    return bcrypt.genSalt(saltRounds).then(salt => {
        return bcrypt.hash(password, salt);
    });
}

module.exports = {
    validatePassword,
    hashPassword
}