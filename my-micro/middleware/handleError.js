const chalk = require("chalk");
const handleError = (err, req, res, next) => {
    res.status(500).send(err.message);
    next(err);
};

module.exports = {
    handleError
};
