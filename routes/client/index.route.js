const ProductRoutes = require("./product.route");
const HomeRoutes = require("./home.route");
module.exports = (app) => {
    app.use("/", HomeRoutes);
    app.use("/products", ProductRoutes);
};
