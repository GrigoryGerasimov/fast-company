const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Profession = model("Profession", schema);

module.exports = {
    Profession
};
