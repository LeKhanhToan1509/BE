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
    role_id: {
        type: String,
        default: "660232e4365d4059a9487241",
    },
    status: Number,
    delete: { type: Boolean, default: false },
});

const account = mongoose.model("Account", accountSchema, "accounts");
module.exports = account;
