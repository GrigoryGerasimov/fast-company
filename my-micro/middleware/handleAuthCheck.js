const chalk = require("chalk");
const { TokenService } = require("../services/TokenService");

const tokenService = new TokenService();

const handleAuthCheck = async (req, res, next) => {
    if (req.method === "OPTIONS") next();

    try {
        const token = req.headers.authorization.split(" ")[1];

        const verifiedToken = tokenService.validate(token, "accessToken");

        if (!verifiedToken) {
            return res.status(401).send("Unauthorized");
        }

        req.user = verifiedToken._id;

        next();
    } catch (err) {
        res.status(500).send("Произошёл внутренний сбой на сервере. Повторите попытку снова");
    }
};

module.exports = {
    handleAuthCheck
};
