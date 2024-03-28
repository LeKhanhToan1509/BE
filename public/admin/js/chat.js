const formSendData = document.querySelector("#send-message");
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        if (e.target.elements.message.value.trim() != "") {
            const content = e.target.elements.message.value;
            socket.emit("CLIENT_SEND_MESSAGE", content);
            e.target.elements.message.value = "";
        } else {
            e.target.elements.message.value = "";
        }
    });
}
document.addEventListener("DOMContentLoaded", (event) => {
    const messagesContainer = document.querySelector(".messages");
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});

socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const id = document.querySelector("[my-id]").getAttribute("my-id");
    const message = document.querySelector(".messages");
    const div = document.createElement("div");
    div.classList.add("message");
    if (id == data.userID) {
        div.classList.add("outgoing");
        div.innerHTML = `<div class="content">${data.content}</div>`;
    } else {
        div.classList.add("incoming");
        div.innerHTML = `<div class="content">${data.content}</div>`;
    }
    message.appendChild(div);
    message.scrollTop = message.scrollHeight;
});
