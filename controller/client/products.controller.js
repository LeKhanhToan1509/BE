module.exports.index = (req, res) => {
    res.send("<h1>Products</h1>");
};

module.exports.edit = (req, res) => {
    res.send("<h1>Edit</h1>");
};

module.exports.delete = (req, res) => {
    res.send("<h1>Delete</h1>");
};

module.exports.create = (req, res) => {
    res.send("<h1>Create</h1>");
};
