// Đảm bảo rằng bạn đã require các module cần thiết ở đầu file
const chat = require("../../models/chat.model");
const chatUser = require("../../models/account.model");

module.exports.index = async (req, res) => {
    const user_id = res.locals.user._id;
    const fullname = res.locals.user.name;

    setupSocketListeners(user_id, fullname);

    // Logic để lấy dữ liệu chat và gửi dữ liệu đến template Pug
    const chats = await chat.find({ delete: false }).lean();
    const userIDs = chats.map((item) => item.user_id);
    const users = await chatUser.find(
        { _id: { $in: userIDs } },
        "name image _id"
    );

    for (const item of chats) {
        item.inforUser = users.find((user) => user._id.equals(item.user_id));
    }

    res.render("admin/pages/chat/chat.pug", { chat: chats });
};

function setupSocketListeners(user_id, fullname) {
    _io.once("connection", (socket) => {
        console.log("Connected user_id:", user_id);

        socket.on("CLIENT_SEND_MESSAGE", (message) =>
            handleSendMessage(user_id, fullname, message)
        );
        socket.on("CLIENT_SEND_TYPING", (type) =>
            handleSendTyping(socket, user_id, fullname, type)
        );
    });
}

async function handleSendMessage(user_id, fullname, message) {
    const newChat = new chat({ content: message, user_id });
    await newChat.save();
    _io.emit("SERVER_RETURN_MESSAGE", {
        userID: user_id,
        name: fullname,
        content: message,
    });
}

function handleSendTyping(socket, user_id, fullname, type) {
    socket.broadcast.emit("SERVER_RETURN_TYPING", {
        name: fullname,
        userID: user_id,
        type,
    });
    console.log(type);
}
