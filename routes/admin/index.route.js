const dashboardRoutes = require("./dashboard.route");
const systemConfig = require("../../config/system");
const productRoutes = require("./product.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.router");
const loginRoutes = require("./auth.route");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
    app.use(PATH_ADMIN + "/products", productRoutes);
    app.use(PATH_ADMIN + "/roles", roleRoutes);
    app.use(PATH_ADMIN + "/account", accountRoutes);
    app.use(PATH_ADMIN + "/auth", loginRoutes);
};
