const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length) {
    let url = new URL(location.href);
    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status", status);
                url.searchParams.delete("page");
            } else {
                url.searchParams.delete("status");
            }
            location.href = url;
        });
    });
}

const formSearch = document.querySelector("#formSearch");
if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        url = new URL(location.href);
        const search = formSearch.querySelector("input").value;
        if (search) {
            url.searchParams.set("title", search);
            url.searchParams.delete("page");
        } else {
            url.searchParams.delete("title");
        }

        location.href = url;
    });
}

const page = document.querySelectorAll("[numberpage]");
if (page.length) {
    url = new URL(location.href);
    let activeIndex = 1;
    if (url.searchParams.get("page")) {
        activeIndex = url.searchParams.get("page");
    }
    page[parseInt(activeIndex) - 1].classList.add("active");
    page.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const page = item.getAttribute("numberpage");
            if (page) {
                url.searchParams.set("page", page);
            } else {
                url.searchParams.delete("page");
            }
            location.href = url;
        });
    });
}

const pagebutton = document.querySelectorAll(".special");
if (pagebutton.length) {
    pagebutton[0].addEventListener("click", (e) => {
        e.preventDefault();
        url = new URL(location.href);
        let currentPage = url.searchParams.get("page");
        if (currentPage) {
            currentPage = parseInt(currentPage);
            if (currentPage > 1) {
                currentPage--;
            }
        }
        url.searchParams.set("page", currentPage);
        location.href = url;
    });
    pagebutton[1].addEventListener("click", (e) => {
        e.preventDefault();
        url = new URL(location.href);
        let currentPage = url.searchParams.get("page") || 1;
        if (currentPage) {
            currentPage = parseInt(currentPage);
            if (currentPage) {
                currentPage++;
            }
        }
        url.searchParams.set("page", currentPage);
        location.href = url;
    });
}
