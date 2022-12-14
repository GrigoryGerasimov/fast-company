const { Schema, model } = require("mongoose");

const schema = new Schema({
    content: {
        type: String,
        required: true
    },
    pageId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

const Comment = model("Comment", schema);

module.exports = {
    Comment
};
