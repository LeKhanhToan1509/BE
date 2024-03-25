const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0) {
    const formStatusChange = document.querySelector("#form-change-status");
    let path = "";
    if (formStatusChange) {
        path = formStatusChange.getAttribute("data-path");
    }
    buttonsChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusChange = status == 1 ? "inactive" : "active";
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formStatusChange.action = action;
            formStatusChange.submit();
        });
    });
}

const chooseAll = document.querySelector("#chooseAll");
const checkBoxes = document.querySelectorAll(".choose");
chooseAll.addEventListener("change", (e) => {
    e.preventDefault();
    checkBoxes.forEach((item) => {
        item.checked = chooseAll.checked;
    });
});
checkBoxes.forEach((item) => {
    item.addEventListener("change", (e) => {
        e.preventDefault();
        let check = true;
        checkBoxes.forEach((item) => {
            if (!item.checked) {
                check = false;
            }
        });
        chooseAll.checked = check;
    });
});

const changeMulti = document.querySelector("#formChangeMulti");
const inputList = document.querySelector("#form-control");
const statusForm = document.querySelector("#form-status");
const Active = document.querySelector("#buttonActive");
const Inactive = document.querySelector("#buttonInactive");

if (Inactive) {
    Inactive.addEventListener("click", (e) => {
        e.preventDefault();
        let submitList = [];
        checkBoxes.forEach((item) => {
            if (item.checked) {
                submitList.push(item.value);
            }
        });
        if (submitList.length > 0) {
            inputList.value = submitList.join(",");
            statusForm.value = 0;
            changeMulti.submit();
        }
    });
}

if (Active) {
    Active.addEventListener("click", (e) => {
        e.preventDefault();
        let submitList = [];
        checkBoxes.forEach((item) => {
            if (item.checked) {
                submitList.push(item.value);
            }
        });
        if (submitList.length > 0) {
            inputList.value = submitList.join(",");
            statusForm.value = 1;
            changeMulti.submit();
        }
    });
}

const deleteButton = document.querySelectorAll(".text.delete");
const editButton = document.querySelectorAll(".text.edit");
const deleteForm = document.querySelector("#deleteForm");
if (deleteButton.length) {
    deleteButton.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const path = deleteForm.getAttribute("path");
            const id = item.getAttribute("data-id");
            const action = path + `${id}?_method=PATCH`;
            console.log(action);
            deleteForm.action = action;
            deleteForm.submit();
        });
    });
}
