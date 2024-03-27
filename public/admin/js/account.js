const statusForm = document.querySelector("#statusForm");
const statusButton = document.querySelectorAll("[data-id]");

statusButton[1].addEventListener("click", (e) => {
    e.preventDefault();
    const id = statusButton[1].getAttribute("data-id");
    const status = statusButton[1].getAttribute("data-status");
    const action = statusForm.action;
    const path = `${action}/${status}/${id}?_method=PATCH`;
    statusForm.action = path;
    console.log(path);
    statusForm.submit();
});

statusButton[0].addEventListener("click", (e) => {
    e.preventDefault();
    const id = statusButton[0].getAttribute("data-id");
    const status = statusButton[0].getAttribute("data-status");
    const action = statusForm.action;
    const path = `${action}/${status}/${id}`;
    statusForm.action = path;
    location.href = path;
});
