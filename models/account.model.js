const mongoose = require("mongoose");
const gen = require("../controller/help/gen.js");

const accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    phone_number: String,
    token: {
        type: String,
        default: gen.generateString(6),
    },
    image: String,
    role_id: String,
    status: Number,
    delete: { type: Boolean, default: false },
});

const account = mongoose.model("products", accountSchema, "accounts");
module.exports = account;
