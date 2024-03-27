const createForm = document.querySelector("#createFormRole");
const editButton = document.querySelector("#editButton");
editButton.addEventListener("click", (e) => {
    e.preventDefault();
    const action = createForm.action + "?_method=PATCH";
    console.log(action);
    createForm.setAttribute("action", action);
    createForm.submit();
});


