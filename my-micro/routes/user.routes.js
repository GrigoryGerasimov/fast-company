const chalk = require("chalk");
const { Router } = require("express");
const { User } = require("../models/User");
const { handleAuthCheck } = require("../middleware/handleAuthCheck");

const router = Router({ mergeParams: true });

router.put("/:userId", handleAuthCheck, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).send("Произошёл внутренний сбой на сервере. Повторите попытку снова");
    }
});

router.get("/", handleAuthCheck, async (req, res) => {
    try {
        const list = await User.find();
        res.status(200).send(list);
    } catch (err) {
        res.status(500).send("Произошёл внутренний сбой на сервере. Повторите попытку снова");
    }
});

router.get("/:userId", handleAuthCheck, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send("Произошёл внутренний сбой на сервере. Повторите попытку снова");
    }
});

module.exports = router;
