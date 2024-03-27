const editForm = document.querySelector("#editForm");
const editButton = document.querySelector("#editButton");

editButton.addEventListener("click", (e) => {
    e.preventDefault();
    const action = editForm.action;
    const ID = editForm.getAttribute("data-id");
    const path = `${action}/${ID}?_method=PATCH`;
    editForm.action = path;
    editForm.submit();
});
document
    .querySelector(".custom-file-input")
    .addEventListener("change", function (e) {
        var fileName = document.getElementById("validatedCustomFile").files[0]
            .name;
        var nextSibling = e.target.nextElementSibling;
        nextSibling.innerText = fileName;
    });
