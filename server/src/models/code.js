const { Schema, model } = require("mongoose");

const codeSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = { CodeModel: model("code", codeSchema) };