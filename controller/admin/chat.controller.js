const chat = require("../../models/chat.model");
const chatUser = require("../../models/account.model");
module.exports.index = async (req, res) => {
    let user_id = res.locals.user._id;
    let fullname = res.locals.user.name;
    _io.once("connection", (socket) => {
        console.log("Connected user_id:", user_id);
        socket.on("CLIENT_SEND_MESSAGE", async (message) => {
            const newChat = new chat({
                content: message,
                user_id: user_id,
            });

            await newChat.save();
            _io.emit("SERVER_RETURN_MESSAGE", {
                userID: user_id,
                name: fullname,
                content: message,
            });
        });
    });

    const chats = await chat.find({
        delete: false,
    });
    for (const item of chats) {
        const user = await chatUser
            .findOne({
                _id: item.user_id,
            })
            .select("name image _id");
        item.inforUser = user;
    }

    res.render("admin/pages/chat/chat.pug", {
        chat: chats,
    });
};
