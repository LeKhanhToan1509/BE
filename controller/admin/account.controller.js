const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

module.exports.index = async (req, res) => {
    const acc = await Account.find({ delete: false });
    res.render("admin/pages/account/index.pug", {
        items: acc,
    });
};

module.exports.create = async (req, res) => {
    const role = await Role.find({ delete: false });
    res.render("admin/pages/account/create.pug", {
        items: role,
    });
};

module.exports.createAccount = async (req, res) => {
    const account = new Account(req.body);
    await account.save();
    res.redirect("back");
};

module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const role = await Role.find({ delete: false });
    const acc = await Account.findOne({ _id: id });
    const img = acc.image;
    console.log(acc);
    res.render("admin/pages/account/edit.pug", {
        item: acc,
        items: role,
        img: img,
    });
};
module.exports.editAccount = async (req, res) => {
    const id = req.params.id;
    await Account.updateMany({ _id: id }, { $set: { ...req.body } });
    res.redirect("back");
};
module.exports.deleteAccount = async (req, res) => {
    const id = req.params.id;
    await Account.deleteOne({ _id: id });
    res.redirect("back");
};
