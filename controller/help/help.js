module.exports = (query) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: "",
        },
        {
            name: "Hoạt Động",
            status: 1,
            class: "",
        },
        {
            name: "Không Hoạt Động",
            status: 0,
            class: "",
        },
    ];

    let name = "Tất cả";
    if (query.status) {
        filterStatus = filterStatus.map((status) => {
            if (status.status == query.status) {
                status.class = "active";
                name = status.name;
            }
            return status;
        });
    }
    return { filterStatus, name };
};
