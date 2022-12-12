const jwt = require("jsonwebtoken");
const config = require("config");
const { Token } = require("../models/Token");
class TokenService {
    generate(payload) {
        const accessToken = jwt.sign(payload, config.get("accessToken"), { expiresIn: "1h" });
        const refreshToken = jwt.sign(payload, config.get("refreshToken"));
        return {
            accessToken,
            refreshToken,
            expiresIn: 3600
        };
    }

    async save(user, refreshToken) {
        const existingToken = await Token.findOne({ user });
        if (!existingToken) {
            return await Token.create({ user, refreshToken });
        }
        existingToken.refreshToken = refreshToken;
        return existingToken.save();
    }

    validate(token, tokenType) {
        try {
            return jwt.verify(token, config.get(tokenType));
        } catch (err) {
            return null;
        }
    }

    async findToken(refreshToken) {
        try {
            return await Token.findOne({ refreshToken });
        } catch (err) {
            return null;
        }
    }
};

module.exports = {
    TokenService
};
