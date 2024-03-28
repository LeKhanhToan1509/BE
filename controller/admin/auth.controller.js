const Account = require("../../models/account.model.js");
const system = require("../../config/system.js");
module.exports.login = (req, res) => {
    res.render("admin/pages/auth/login.pug");
};

module.exports.signup = (req, res) => {
    res.render("admin/pages/auth/signup.pug");
};

module.exports.signupPost = async (req, res) => {
    const newAcc = new Account(req.body);
    await newAcc.save();
    res.redirect(`${system.prefixAdmin}/auth/login`);
};

module.exports.checkLogin = async (req, res) => {
    const acc = await Account.findOne({ email: req.body.email });
    if (!acc) {
        res.redirect("back");
    } else {
        if (acc.password != req.body.password) {
            res.redirect("back");
        }
        if (acc.status == 0) {
            res.redirect("back");
        }
        res.cookie("token", acc.token, {});
        res.redirect(`${system.prefixAdmin}/dashboard`);
    }
};

module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect(`${system.prefixAdmin}/auth/login`);
};
