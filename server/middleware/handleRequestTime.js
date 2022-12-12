const chalk = require("chalk");

const handleRequestTime = (req, res, next) => {
    req.requestTime = Date.now();
    console.log(chalk.magentaBright(req.requestTime));
    next();
};

module.exports = {
    handleRequestTime
};
