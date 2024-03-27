const Editform = document.querySelector("#formEdit");
const EditButton = document.querySelectorAll(".text.edit");
const DeleteButton = document.querySelectorAll(".text.delete");

EditButton.forEach((button) => {
    button.addEventListener("click", (e) => {
        let url = new URL(location.href);
        e.preventDefault();
        const id = button.getAttribute("data-id");
        const path = `${url}/edit/${id}`;
        url = path;
        location.href = url;
    });
});

DeleteButton.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const id = button.getAttribute("data-id");
        const path = Editform.getAttribute("action");
        const action = `${path}/delete/${id}?_method=PATCH`;
        Editform.action = action;
        Editform.submit();
    });
});
