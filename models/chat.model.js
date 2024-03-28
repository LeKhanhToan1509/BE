const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user_id: String,
    room_chat_id: String,
    content: String,
    imgages: Array,
    delete: {
        type: String,
        default: "false",
    },
});

const chat = mongoose.model("Chat", chatSchema, "chats");
module.exports = chat;
