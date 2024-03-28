const Account = require("../../models/account.model.js");
const system = require("../../config/system.js");

module.exports.login = (req, res) => {
    res.render("admin/pages/auth/login.pug");
};

module.exports.signup = (req, res) => {
    res.render("admin/pages/auth/signup.pug");
};

module.exports.signupPost = async (req, res) => {
    try {
        const newAcc = new Account(req.body);
        await newAcc.save();
        res.redirect(`${system.prefixAdmin}/auth/login`);
    } catch (error) {
        // Handle error here
        console.error(error);
        res.redirect("back");
    }
};

module.exports.checkLogin = async (req, res) => {
    try {
        const acc = await Account.findOne({ email: req.body.email });
        if (!acc) {
            res.redirect("back");
        } else {
            if (acc.password !== req.body.password) {
                res.redirect("back");
            }
            if (acc.status === 0) {
                res.redirect("back");
            }
            res.cookie("token", acc.token, {});
            res.redirect(`${system.prefixAdmin}/dashboard`);
        }
    } catch (error) {
        // Handle error here
        console.error(error);
        res.redirect("back");
    }
};

module.exports.logout = (req, res) => {
    try {
        res.clearCookie("token");
        res.redirect(`${system.prefixAdmin}/auth/login`);
    } catch (error) {
        // Handle error here
        console.error(error);
        res.redirect("back");
    }
};
