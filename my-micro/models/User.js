const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    profession: {
        type: Schema.Types.ObjectId,
        ref: "Profession"
    },
    qualities: [{
        type: Schema.Types.ObjectId,
        ref: "Quality"
    }],
    completedMeetings: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    }
}, {
    timestamps: true
});

const User = model("User", schema);

module.exports = {
    User
};
