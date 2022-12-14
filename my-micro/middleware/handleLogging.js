const chalk = require("chalk");

const urlLogger = (req, res, next) => {
    console.log(chalk.blue(req.originalUrl));
    next();
};

const methodLogger = (req, res, next) => {
    console.log(chalk.blue(req.method));
    next();
};

const headersLogger = (req, res, next) => {
    console.log(chalk.blue(req.headers));
    next();
};

const contentTypeLogger = (req, res, next) => {
    console.log(chalk.blue(req.contentType));
    next();
};

const handleLogging = [urlLogger, methodLogger, headersLogger, contentTypeLogger];

module.exports = {
    handleLogging
};
