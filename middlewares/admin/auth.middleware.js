const systemConfig = require("../../config/system");
const acc = require("../../models/account.model");
const role = require("../../models/role.model");

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        return;
    } else {
        const user = await acc
            .findOne({ token: req.cookies.token })
            .select("-password");
        if (!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
            return;
        } else {
            const roles = await role.findOne({ _id: user.role_id });
            if (roles) {
                res.locals.role = roles;
            }
            res.locals.user = user;
            next();
        }
    }
};
