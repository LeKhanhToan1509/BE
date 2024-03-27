const apply = document.querySelector("#applyButton");
const permissionForm = document.querySelector("#permission-form");
apply.addEventListener("click", (e) => {
    e.preventDefault();
    const action = permissionForm.action + "?_method=PATCH";
    permissionForm.action = action;
    permissionForm.submit();
});

let arr = [];
const postID = document.querySelectorAll("[postID]");
if (postID) {
    postID.forEach((item) => {
        arr.push({
            id: item.value,
            permissions: [],
        });
    });
}
const postInput = document.querySelector("#post-input");

const input = document.querySelectorAll("[type]");
console.log(input);

const updatePermissions = (item, addPermission) => {
    arr.forEach((element) => {
        if (element.id == item.getAttribute("ID")) {
            if (addPermission) {
                element.permissions.push(item.getAttribute("name"));
            } else {
                element.permissions = element.permissions.filter(
                    (el) => el !== item.getAttribute("name")
                );
            }
        }
    });
};

input.forEach((item) => {
    item.addEventListener("change", (e) => {
        e.preventDefault();
        updatePermissions(item, item.checked);
        if (arr.length > 0) {
            postInput.value = JSON.stringify(arr);
        }
    });
});

input.forEach((item) => {
    if (item.checked) {
        updatePermissions(item, true);
    }
});

if (arr.length > 0) {
    postInput.value = JSON.stringify(arr);
}
