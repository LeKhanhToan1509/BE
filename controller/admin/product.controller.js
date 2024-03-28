const Product = require("../../models/product.model");
const algorithms = require("../algorithm/algorithm");
const filterStatusHelper = require("../help/help");
const Page = require("../help/page");
const acc = require("../../models/account.model");

module.exports.product = async (req, res) => {
    try {
        const help = filterStatusHelper(req.query);
        const page = Page(req.query);
        let sort = {};
        if (req.query.keyword && req.query.keyvalue) {
            sort[req.query.keyword] = req.query.keyvalue;
        }
        let findByStatus = {};
        if (req.query.status) {
            findByStatus.status = req.query.status;
        }
        let products = await Product.find({
            $and: [{ delete: false }, findByStatus],
        }).sort(sort);

        if (req.query.title) {
            products = products.filter((product) =>
                algorithms.fuzzySearch(req.query.title, product.title)
            );
        }

        const cnt = products.length;
        products = products.slice(
            (page.page - 1) * page.limit,
            page.page * page.limit
        );
        res.render("admin/pages/product/index.pug", {
            products: products,
            filterStatus: help.filterStatus,
            name: help.name,
            page: page.page,
            PageLimit: Math.ceil(cnt / page.limit),
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

module.exports.changeStatus = async (req, res) => {
    const dataStatus = req.params.status;
    const status = dataStatus === "active" ? 1 : 0;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { status: status });
    res.redirect("back");
};

module.exports.multiChangeStatus = async (req, res) => {
    const ids = req.body.input.split(",");
    await Product.updateMany(
        { _id: { $in: ids } },
        { $set: { status: req.body.status } }
    );
    res.redirect("back");
};

module.exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { delete: true });
    res.redirect("back");
};

module.exports.create = async (req, res) => {
    res.render("admin/pages/product/create.pug");
};

module.exports.createProduct = async (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let discount = req.body.discount;
    let thumb = req.body.image;
    let price = req.body.price;
    let status = req.body.status;
    console.log(req.body);
    console.log(thumb);
    const product = new Product({
        title: title,
        description: description,
        discount: discount,
        thumbnail: thumb,
        price: price,
        status: status,
    });
    await Product.insertMany([product]);
    res.redirect("back");
};
