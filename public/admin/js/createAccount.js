const createAccount = document.querySelector("#createForm");
const createButton = document.querySelector("#createButton");

createButton.addEventListener("click", (e) => {
    e.preventDefault();
    const action = createAccount.action;
    console.log(action);
    createAccount.submit();
});
document
    .querySelector(".custom-file-input")
    .addEventListener("change", function (e) {
        var fileName = document.getElementById("validatedCustomFile").files[0]
            .name;
        var nextSibling = e.target.nextElementSibling;
        nextSibling.innerText = fileName;
    });
