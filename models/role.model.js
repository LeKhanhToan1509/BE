const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    title: String,
    description: String,
    permissions: {
        type: Array,
    },
    delete: { type: Boolean, default: false },
});

const Role = mongoose.model("Roles", roleSchema, "roles");
module.exports = Role;
