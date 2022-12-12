const chalk = require("chalk");

const handleRequestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};

module.exports = {
    handleRequestTime
};
