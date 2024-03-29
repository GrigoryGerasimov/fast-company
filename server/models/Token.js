const { Schema, model } = require("mongoose");

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Token = model("Token", schema);

module.exports = {
    Token
};
