const chalk = require("chalk");
const { Router } = require("express");
const { Quality } = require("../models/Quality");

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const list = await Quality.find();
        res.status(200).send(list);
    } catch (err) {
        res.status(500).send("Произошёл внутренний сбой на сервере. Повторите попытку снова");
    }
});

module.exports = router;
