const dashboardRoutes = require("./dashboard.route");
const systemConfig = require("../../config/system");
const productRoutes = require("./product.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.router");
const loginRoutes = require("./auth.route");
const middleware = require("../../middlewares/admin/auth.middleware");
const chatRoutes = require("./chat.route");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", middleware.requireAuth, dashboardRoutes);
    app.use(PATH_ADMIN + "/products", middleware.requireAuth, productRoutes);
    app.use(PATH_ADMIN + "/roles", middleware.requireAuth, roleRoutes);
    app.use(PATH_ADMIN + "/account", middleware.requireAuth, accountRoutes);
    app.use(PATH_ADMIN + "/auth", loginRoutes);
    app.use(PATH_ADMIN + "/chat", middleware.requireAuth, chatRoutes);
};
