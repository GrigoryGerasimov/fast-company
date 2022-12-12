const handleAccessCheck = (req, res, next) => {
    if (!req.accepts(["text/plain", "text/html", "application/json", "application/x-www-urlencoded"])) {
        return res.status(406).send("Not accepted");
    }
    next();
};

module.exports = {
    handleAccessCheck
};
