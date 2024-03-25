const createForm = document.querySelector("#createForm");
const createButton = document.querySelector("#createButton");
const textForm = document.querySelectorAll(".textForm");

if (createButton) {
    createButton.addEventListener("click", (e) => {
        e.preventDefault();
        createForm.submit();
    });
}

document
    .querySelector(".custom-file-input")
    .addEventListener("change", function (e) {
        var fileName = document.getElementById("validatedCustomFile").files[0]
            .name;
        var nextSibling = e.target.nextElementSibling;
        nextSibling.innerText = fileName;
    });
