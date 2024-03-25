const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    const products = await Product.find({});
    res.render("client/pages/products", {
        pageTitle: "Products",
        items: products,    
    });
};

module.exports.edit = (req, res) => {
    res.render("client/pages/products", {
        pageTitle: "Edit",
    });
};

module.exports.delete = (req, res) => {
    res.render("client/pages/products", {
        pageTitle: "Delete",
    });
};

module.exports.create = (req, res) => {
    res.render("client/pages/products", {
        pageTitle: "Create",
    });
};
