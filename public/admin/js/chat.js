document.addEventListener("DOMContentLoaded", () => {
    setupChatForm();
    setupMessageScroll();
    setupServerMessageListener();
    setupEmojiPicker();
    setupInputChat();
    setupTypingIndicator();
});

function setupChatForm() {
    const formSendData = document.querySelector("#send-message");
    if (formSendData) {
        formSendData.addEventListener("submit", handleChatSubmit);
    }
}

function handleChatSubmit(e) {
    e.preventDefault();
    const messageInput = e.target.elements.message;
    if (messageInput.value.trim() !== "") {
        socket.emit("CLIENT_SEND_MESSAGE", messageInput.value.trim());
        messageInput.value = "";
    }
}

function setupMessageScroll() {
    const messagesContainer = document.querySelector(".messages");
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function setupServerMessageListener() {
    socket.on("SERVER_RETURN_MESSAGE", handleServerReturnMessage);
}

function handleServerReturnMessage(data) {
    const myId = document.querySelector("[my-id]")?.getAttribute("my-id");
    const messages = document.querySelector(".messages");
    const box = document.querySelector(".typing");
    if (messages) {
        const div = document.createElement("div");
        div.classList.add(
            "message",
            data.userID === myId ? "outgoing" : "incoming"
        );
        div.innerHTML = `<div class="content">${data.content}</div>`;
        messages.insertBefore(div, box);
        messages.scrollTop = messages.scrollHeight;
    }
}

function setupEmojiPicker() {
    const emojiPicker = document.querySelector("emoji-picker");
    if (emojiPicker) {
        emojiPicker.addEventListener("emoji-click", (e) => {
            const input = document.querySelector(".value");
            if (input) {
                input.value += e.detail.unicode;
            }
        });
    }
}

function setupInputChat() {
    let timeout;
    const inputChat = document.querySelector(".value");
    if (inputChat) {
        inputChat.addEventListener("keyup", () => {
            socket.emit("CLIENT_SEND_TYPING", "show");
            clearTimeout(timeout);
            timeout = setTimeout(
                () => socket.emit("CLIENT_SEND_TYPING", "hide"),
                1500
            );
        });
    }
}

function setupTypingIndicator() {
    let isTypingIndicatorShown = false;
    socket.on("SERVER_RETURN_TYPING", (data) => {
        const typingIndicator = document.querySelector(".typing");
        if (typingIndicator) {
            if (data.type === "show" && !isTypingIndicatorShown) {
                typingIndicator.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
                isTypingIndicatorShown = true;
            } else if (data.type === "hide" && isTypingIndicatorShown) {
                typingIndicator.innerHTML = "";
                isTypingIndicatorShown = false;
            }
        }
        const messages = document.querySelector(".messages");
        messages.scrollTop = messages.scrollHeight;
    });
}
