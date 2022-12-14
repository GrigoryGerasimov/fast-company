const { Router } = require("express");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { getRandomData } = require("../utils/getRandomData");
const { TokenService } = require("../services/TokenService");
const chalk = require("chalk");

const router = Router({ mergeParams: true });
const tokenService = new TokenService();

const validationOnSignUp = [
    check("email", "Адрес электронной почты некорректен").isEmail(),
    check("password", "Пароль должен содержать как минимум 8 символов").isLength({ min: 8 })
];
const validationOnSignIn = [
    check("email", "Адрес электронной почты некорректен").exists().normalizeEmail().isEmail(),
    check("password", "Введите корректный пароль").exists()
];

router.post("/signUp", [
    validationOnSignUp,
    async (req, res) => {
        try {
            if (!validationResult(req).isEmpty()) {
                return res.status(400).json({
                    error: process.env.NODE_ENV === "development" ? {
                        code: 400,
                        message: "INVALID_DATA",
                        errors: validationResult(req).array()
                    } : {
                        code: 400,
                        message: "INVALID_DATA"
                    }
                });
            }

            const { email, password } = req.body;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    error: {
                        code: 400,
                        message: "EMAIL_EXISTS"
                    }
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await User.create({
                ...getRandomData(),
                ...req.body,
                password: hashedPassword
            });

            const tokens = tokenService.generate({ _id: newUser._id });
            await tokenService.save(newUser._id, tokens.refreshToken);
            res.status(201).json({ ...tokens, _id: newUser._id });
        } catch (err) {
            res.status(500).send("Произошёл внутренний сбой на сервере. Повторите попытку снова");
        }
    }]);

router.post("/signInWithPassword", [
    validationOnSignIn,
    async (req, res) => {
        try {
            if (!validationResult(req).isEmpty()) {
                return res.status(400).json({
                    error: process.env.NODE_ENV === "development" ? {
                        message: "INVALID_PASSWORD",
                        code: 400,
                        errors: validationResult(req).array()
                    } : {
                        message: "INVALID_PASSWORD",
                        code: 400
                    }
                });
            }

            const { email, password } = req.body;

            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(400).json({
                    error: {
                        code: 400,
                        message: "EMAIL_NOT_FOUND"
                    }
                });
            }

            const hasMatched = await bcrypt.compare(password, existingUser.password);

            if (!hasMatched) {
                return res.status(400).json({
                    error: {
                        code: 400,
                        message: "INVALID_PASSWORD"
                    }
                });
            }

            const tokens = tokenService.generate({ _id: existingUser._id });
            await tokenService.save(existingUser._id, tokens.refreshToken);
            res.status(200).json({ ...tokens, _id: existingUser._id });
        } catch (err) {
            res.status(500).send("Произошёл внутренний сбой на сервере. Повторите попытку снова");
        }
    }]);

router.post("/token", async (req, res) => {
    const isTokenInvalid = (token, dbToken) => !token || !dbToken || token._id !== dbToken?.user.toString();
    try {
        const { refresh_token: refreshToken } = req.body;
        const verifiedToken = tokenService.validate(refreshToken, "refreshToken");
        const dbToken = await tokenService.findToken(refreshToken);

        if (isTokenInvalid(verifiedToken, dbToken)) {
            return res.status(401).json({
                error: {
                    message: "Unauthorized",
                    code: 401
                }
            });
        }

        const tokens = tokenService.generate({ _id: dbToken.user.toString() });
        await tokenService.save(dbToken.user.toString(), tokens.refreshToken);
        res.status(200).json({ ...tokens, userId: dbToken.user.toString() });
    } catch (err) {
        res.status(500).send("Произошёл внутренний сбой на сервере. Повторите попытку снова");
    }
});

module.exports = router;
