const statusForm = document.querySelector("#statusForm");
const statusButton = document.querySelectorAll("[data-id]");

statusButton.forEach((item, index) => {
    if (index % 2 == 1) {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const id = item.getAttribute("data-id");
            const status = item.getAttribute("data-status");
            const action = statusForm.action;
            const path = `${action}/${status}/${id}?_method=PATCH`;
            statusForm.action = path;
            console.log(path);
            statusForm.submit();
        });
    }
});
statusButton.forEach((item, index) => {
    if (index % 2 == 0) {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const id = item.getAttribute("data-id");
            const status = item.getAttribute("data-status");
            const action = statusForm.action;
            const path = `${action}/${status}/${id}`;
            statusForm.action = path;
            location.href = path;
        });
    }
});
