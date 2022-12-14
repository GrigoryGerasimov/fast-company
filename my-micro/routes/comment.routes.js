const chalk = require("chalk");
const { Router } = require("express");
const { Comment } = require("../models/Comment");
const { handleAuthCheck } = require("../middleware/handleAuthCheck");
const router = Router({ mergeParams: true });

router.delete("/:commentId", [
    handleAuthCheck,
    async (req, res, next) => {
        try {
            if (!req.params.commentId) next("route");

            const comment = await Comment.findById(req.params.commentId);

            if (req.user !== comment.userId.toString()) {
                return res.status(401).send("Unauthorized");
            }

            await Comment.findByIdAndDelete(req.params.commentId);
            res.status(200).send("Комментарий успешно удалён");
        } catch (err) {
            res.status(500).send("Произошёл внутренний сбой на сервере. Попробуйте ещё");
        }
    }]);

router.route("/").get(
    handleAuthCheck,
    async (req, res) => {
        try {
            const { orderBy, equalTo } = req.query;
            const list = await Comment.find({ [orderBy]: equalTo });
            res.status(200).send(list);
        } catch (err) {
            res.status(500).send("Произошёл внутренний сбой на сервере. Попробуйте ещё");
        }
    }
).post(
    handleAuthCheck,
    async (req, res) => {
        try {
            const newComment = await Comment.create({
                ...req.body,
                userId: req.user
            });
            res.status(201).json(newComment);
        } catch (err) {
            res.status(500).send("Произошёл внутренний сбой на сервере. Попробуйте ещё");
        }
    }
);

module.exports = router;
