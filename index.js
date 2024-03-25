require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const app = express();
app.use(methodOverride("_method"));
const Route = require("./routes/client/index.route");
const RouteAdmin = require("./routes/admin/index.route");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const connect = require("./config/database.js");
const systemConfig = require("./config/system.js");
connect.connection();
app.use(bodyParser.urlencoded({ extended: false }));
Route(app);
RouteAdmin(app);
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
