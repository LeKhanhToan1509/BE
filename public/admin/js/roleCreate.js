const create = document.querySelector("#createFormRole");
const createButton = document.querySelector("#createButton");
if (create) {
    createButton.addEventListener("click", function (e) {
        e.preventDefault();
        create.submit();
    });
}

