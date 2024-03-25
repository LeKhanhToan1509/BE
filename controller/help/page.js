module.exports = (query) => {
    let Page = {
        page: 1,
        limit: 6,
    };
    if (query.page) {
        Page.page = parseInt(query.page);
    }
    return Page;
};
