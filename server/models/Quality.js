const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Quality = model("Quality", schema);

module.exports = {
    Quality
};
