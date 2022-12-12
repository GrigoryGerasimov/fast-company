const chalk = require("chalk");
const { Router } = require("express");
const { Profession } = require("../models/Profession");

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const list = await Profession.find();
        res.status(200).send(list);
    } catch (err) {
        process.env.NODE_ENV === "development" && console.log(chalk.red(err));
        res.status(500).send("Произошёл внутренний сбой на сервере. Повторите попытку снова");
    }
});

module.exports = router;
